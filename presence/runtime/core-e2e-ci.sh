#!/usr/bin/env bash
set -euo pipefail

USER_ID='dddddddd-dddd-4ddd-8ddd-dddddddddddd'
ORDER_ID='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'
PAYMENT_ID='ffffffff-ffff-4fff-8fff-ffffffffffff'
MP_ORDER='ORD-E2E-001'

psql -v ON_ERROR_STOP=1 <<SQL
insert into auth.users (id, email)
values ('$USER_ID', 'presence-e2e@example.com');

insert into public.orders (id, user_id, amount_cents, currency)
values ('$ORDER_ID', '$USER_ID', 129900, 'BRL');

update public.orders set state='PRODUCT_SELECTED' where id='$ORDER_ID';
update public.orders set state='PAYMENT_PENDING' where id='$ORDER_ID';

insert into public.payment_attempts (
  id, order_id, provider, provider_order_id, idempotency_key,
  status, amount_cents, currency
)
values (
  '$PAYMENT_ID', '$ORDER_ID', 'mercado_pago', '$MP_ORDER',
  'presence-core-e2e-payment', 'PROCESSING', 129900, 'BRL'
);
SQL

webhook='{"id":"evt-core-e2e","type":"order","action":"order.updated","data":{"id":"ORD-E2E-001"}}'
webhook_hash="$(printf '%s' "$webhook" | sha256sum | awk '{print $1}')"
resource="{\"id\":\"$MP_ORDER\",\"status\":\"processed\",\"status_detail\":\"accredited\",\"external_reference\":\"$ORDER_ID\",\"total_amount\":\"1299.00\",\"currency\":\"BRL\"}"

payment_result="$(psql -qAt -v ON_ERROR_STOP=1 -v webhook="$webhook" -v webhook_hash="$webhook_hash" -v resource="$resource" <<SQL
set role service_role;
select public.process_presence_mercado_pago_payment(
  '$ORDER_ID','evt-core-e2e','$MP_ORDER',true,
  :'webhook'::jsonb,:'webhook_hash',:'resource'::jsonb
);
SQL
)"
test "$payment_result" = "PAID"

psql -v ON_ERROR_STOP=1 -c "update public.orders set state='ONBOARDING' where id='$ORDER_ID'"

node presence/runtime/normalize-onboarding.mjs   --input presence/runtime/fixtures/onboarding.raw.sample.json   --output /tmp/core-e2e-onboarding.json

jq '.slug="e2e-motorista-demo"' /tmp/core-e2e-onboarding.json > /tmp/core-e2e-onboarding-unique.json
payload="$(jq -c . /tmp/core-e2e-onboarding-unique.json)"

psql -v ON_ERROR_STOP=1 -v payload="$payload" <<SQL
set role service_role;
select public.persist_presence_onboarding('$ORDER_ID', :'payload'::jsonb);
SQL

psql -qAt -v ON_ERROR_STOP=1 <<SQL > /tmp/core-e2e-preview.json
set role service_role;
select public.prepare_presence_preview('$ORDER_ID')::text;
SQL

slug="$(jq -r '.slug' /tmp/core-e2e-preview.json)"
template_key="$(jq -r '.templateKey' /tmp/core-e2e-preview.json)"
template_version="$(jq -r '.templateVersion' /tmp/core-e2e-preview.json)"
jq '.renderData' /tmp/core-e2e-preview.json > /tmp/core-e2e-render.json

node presence/runtime/render-driver.mjs   --input /tmp/core-e2e-render.json   --template presence/templates/landing/driver-standard-v1.html   --output /tmp/core-e2e/index.html   --manifest /tmp/core-e2e/manifest.json   --slug "$slug"   --template-key "$template_key"   --template-version "$template_version"

psql -qAt -v ON_ERROR_STOP=1 <<SQL > /tmp/core-e2e-confirmed.json
set role service_role;
select public.confirm_presence_preview('$ORDER_ID')::text;
SQL

snapshot_hash="$(psql -qAt -c "select content_hash from internal.order_snapshots where order_id='$ORDER_ID' and snapshot_kind='public_page' order by created_at desc limit 1")"
artifact_hash="$(jq -r '.sha256' /tmp/core-e2e/manifest.json)"
artifact_bytes="$(jq -r '.bytes' /tmp/core-e2e/manifest.json)"

psql -qAt -v ON_ERROR_STOP=1 <<SQL >/tmp/core-e2e-artifact-id.txt
set role service_role;
select public.record_presence_site_generated('$ORDER_ID','$snapshot_hash','$artifact_hash',$artifact_bytes);
select public.mark_presence_site_published('$ORDER_ID','$artifact_hash');
SQL

test "$(psql -qAt -c "select state from public.orders where id='$ORDER_ID'")" = "SITE_PUBLISHED"
test "$(psql -qAt -c "select count(*) from internal.publication_artifacts where order_id='$ORDER_ID' and artifact_hash='$artifact_hash' and status='PUBLISHED'")" = "1"
test "$(psql -qAt -c "select publication_status from public.driver_pages where user_id='$USER_ID'")" = "published"

grep -qF 'Motorista Demo' /tmp/core-e2e/index.html
! grep -qF 'Rua de Demonstração' /tmp/core-e2e/index.html

echo "Presence core E2E: SITE_PUBLISHED"
