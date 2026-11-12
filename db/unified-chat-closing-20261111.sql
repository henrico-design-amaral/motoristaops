
-- Unified private daily-close writer. Legacy rows are preserved.
create schema if not exists internal_ops;
revoke all on schema internal_ops from public, anon, authenticated;

alter table public.daily_closings
  add column if not exists revision integer not null default 1,
  add column if not exists odometer_end_km numeric,
  add column if not exists fuel_cash_paid numeric,
  add column if not exists fuel_liters numeric;
alter table public.daily_closings
  drop constraint if exists daily_closings_optional_vehicle_values_check;
alter table public.daily_closings
  add constraint daily_closings_optional_vehicle_values_check
  check ((odometer_end_km is null or odometer_end_km >= 0) and
         (fuel_cash_paid is null or fuel_cash_paid >= 0) and
         (fuel_liters is null or fuel_liters >= 0));

-- Anonymous browser clients may not access financial tables.
revoke all privileges on table public.daily_closings from anon;

create table if not exists internal_ops.chat_closing_receipts (
  receipt_id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key text not null,
  operation_date date not null,
  payload_hash text not null,
  closing_id uuid not null references public.daily_closings(id) on delete cascade,
  revision integer not null check (revision > 0),
  persisted_at timestamptz not null default now(),
  unique(owner_id,idempotency_key)
);
create table if not exists internal_ops.daily_close_audit (
  audit_id uuid primary key default gen_random_uuid(),
  closing_id uuid not null,
  owner_id uuid not null,
  operation_date date not null,
  revision integer not null check (revision > 0),
  recorded_at timestamptz not null default now(),
  change_type text not null check (change_type in ('INSERT','UPDATE')),
  source text not null,
  record_after jsonb not null,
  unique(closing_id,revision)
);
alter table internal_ops.chat_closing_receipts enable row level security;
alter table internal_ops.daily_close_audit enable row level security;
revoke all on internal_ops.chat_closing_receipts, internal_ops.daily_close_audit from public, anon, authenticated;

create or replace function internal_ops.bump_daily_close_revision()
returns trigger
language plpgsql
security invoker
set search_path=pg_catalog,public,internal_ops
as $$
begin
  new.revision := old.revision + 1;
  return new;
end
$$;

drop trigger if exists daily_closings_revision on public.daily_closings;
create trigger daily_closings_revision
before update on public.daily_closings
for each row
execute function internal_ops.bump_daily_close_revision();

create or replace function internal_ops.record_daily_close_audit()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,internal_ops
as $$
begin
  insert into internal_ops.daily_close_audit
    (closing_id, owner_id, operation_date, revision, change_type, source, record_after)
  values
    (new.id, new.owner_id, new.operation_date, new.revision, TG_OP, new.source, to_jsonb(new));
  return new;
end
$$;

drop trigger if exists daily_closings_audit on public.daily_closings;
create trigger daily_closings_audit
after insert or update on public.daily_closings
for each row execute function internal_ops.record_daily_close_audit();

-- Non-exposed schema; service principals only. Ordinary users cannot call this function.
create or replace function internal_ops.ingest_chat_daily_close(
  p_owner_id uuid,
  p_operation_date date,
  p_payload jsonb,
  p_idempotency_key text,
  p_expected_revision integer default null
) returns jsonb
language plpgsql
security invoker
set search_path=pg_catalog,public,internal_ops
as $$
declare
  v_existing internal_ops.chat_closing_receipts%rowtype;
  v_closing public.daily_closings%rowtype;
  v_hash text;
  v_key text;
  v_money_keys text[] := array['revenue_uber','revenue_99','revenue_private','tips_extras',
     'fuel_cost','food_cost','wash_cost','other_operational_cost'];
  v_required text[] := array['hours_online','km_total','trips_uber','trips_99','trips_private',
     'revenue_uber','revenue_99','revenue_private','tips_extras',
     'fuel_cost','food_cost','wash_cost','other_operational_cost'];
  v_allowed text[] := array['hours_online','hours_in_ride','km_total','km_passenger',
     'trips_uber','trips_99','trips_private','revenue_uber','revenue_99','revenue_private',
     'tips_extras','fuel_cost','food_cost','wash_cost','other_operational_cost',
     'fuel_efficiency_km_l','fuel_price_reference','odometer_end_km','fuel_cash_paid','fuel_liters',
     'shift','primary_platform','notes'];
begin
  if p_owner_id is null or not exists(select 1 from auth.users where id=p_owner_id) then
    raise exception 'Owner id is missing or unknown';
  end if;
  if p_operation_date is null or p_operation_date > (now() at time zone 'America/Sao_Paulo')::date then
    raise exception 'Closing date invalid or in future';
  end if;
  if p_idempotency_key is null or length(p_idempotency_key)<12 or length(p_idempotency_key)>128
     or left(p_idempotency_key,8)<>'chatgpt:' then
    raise exception 'Idempotency key must be chatgpt:<date>:<version>';
  end if;
  if p_payload is null or jsonb_typeof(p_payload)<>'object' or not (p_payload ?& v_required) then
    raise exception 'Complete numeric fields required; unknown is not zero';
  end if;
  for v_key in select jsonb_object_keys(p_payload) loop
    if not (v_key = any(v_allowed)) then
      raise exception 'Unexpected field: %', v_key;
    end if;
  end loop;
  foreach v_key in array v_required loop
    if jsonb_typeof(p_payload->v_key)<>'number' or (p_payload->>v_key)::numeric < 0 then
      raise exception 'Invalid or missing numeric field: %', v_key;
    end if;
  end loop;
  foreach v_key in array array['hours_in_ride','km_passenger','fuel_efficiency_km_l',
    'fuel_price_reference','odometer_end_km','fuel_cash_paid','fuel_liters'] loop
    if p_payload ? v_key and jsonb_typeof(p_payload->v_key) not in ('null','number') then
      raise exception 'Invalid optional numeric field: %',v_key;
    end if;
    if p_payload ? v_key and jsonb_typeof(p_payload->v_key)='number' and
       (p_payload->>v_key)::numeric < 0 then
      raise exception 'Negative optional numeric field: %',v_key;
    end if;
  end loop;
  foreach v_key in array array['trips_uber','trips_99','trips_private'] loop
    if (p_payload->>v_key) !~ '^[0-9]+$' then
      raise exception 'Noninteger trip count: %',v_key;
    end if;
  end loop;
  if (p_payload->>'hours_online')::numeric <= 0 or
     (p_payload->>'km_total')::numeric <= 0 then
    raise exception 'Daily close requires worked hours and km';
  end if;
  if p_payload ? 'shift' and jsonb_typeof(p_payload->'shift') not in ('null','string') then
    raise exception 'Invalid shift';
  end if;
  if p_payload ? 'primary_platform' and jsonb_typeof(p_payload->'primary_platform') not in ('null','string') then
    raise exception 'Invalid primary platform';
  end if;
  if p_payload ? 'notes' and jsonb_typeof(p_payload->'notes') not in ('null','string') then
    raise exception 'Invalid notes';
  end if;

  v_hash := md5(p_payload::text);
  select * into v_existing from internal_ops.chat_closing_receipts
    where owner_id=p_owner_id and idempotency_key=p_idempotency_key
    for update;
  if found then
    if v_existing.payload_hash<>v_hash or v_existing.operation_date<>p_operation_date then
      raise exception 'Idempotency key reused with different payload';
    end if;
    return jsonb_build_object('status','committed','receipt_id',v_existing.receipt_id,
      'revision',v_existing.revision,'persisted_at',v_existing.persisted_at,
      'already_recorded',true);
  end if;

  select * into v_closing from public.daily_closings
    where owner_id=p_owner_id and operation_date=p_operation_date for update;

  if not found then
    insert into public.daily_closings(
      owner_id,operation_date,source,shift,primary_platform,hours_online,hours_in_ride,
      km_total,km_passenger,trips_uber,trips_99,trips_private,
      revenue_uber,revenue_99,revenue_private,tips_extras,fuel_cost,food_cost,wash_cost,
      other_operational_cost,fuel_efficiency_km_l,fuel_price_reference,
      odometer_end_km,fuel_cash_paid,fuel_liters,notes
    ) values (
      p_owner_id,p_operation_date,'api',p_payload->>'shift',p_payload->>'primary_platform',
      (p_payload->>'hours_online')::numeric,(p_payload->>'hours_in_ride')::numeric,
      (p_payload->>'km_total')::numeric,(p_payload->>'km_passenger')::numeric,
      (p_payload->>'trips_uber')::int,(p_payload->>'trips_99')::int,
      (p_payload->>'trips_private')::int,
      (p_payload->>'revenue_uber')::numeric,(p_payload->>'revenue_99')::numeric,
      (p_payload->>'revenue_private')::numeric,(p_payload->>'tips_extras')::numeric,
      (p_payload->>'fuel_cost')::numeric,(p_payload->>'food_cost')::numeric,
      (p_payload->>'wash_cost')::numeric,(p_payload->>'other_operational_cost')::numeric,
      (p_payload->>'fuel_efficiency_km_l')::numeric,(p_payload->>'fuel_price_reference')::numeric,
      (p_payload->>'odometer_end_km')::numeric,(p_payload->>'fuel_cash_paid')::numeric,
      (p_payload->>'fuel_liters')::numeric,p_payload->>'notes'
    ) returning * into v_closing;
  else
    if p_expected_revision is null or v_closing.revision<>p_expected_revision then
      raise exception 'Existing close requires current revision for correction: %',v_closing.revision;
    end if;
    update public.daily_closings set
      source='api',shift=p_payload->>'shift',primary_platform=p_payload->>'primary_platform',
      hours_online=(p_payload->>'hours_online')::numeric,
      hours_in_ride=(p_payload->>'hours_in_ride')::numeric,
      km_total=(p_payload->>'km_total')::numeric,
      km_passenger=(p_payload->>'km_passenger')::numeric,
      trips_uber=(p_payload->>'trips_uber')::int,
      trips_99=(p_payload->>'trips_99')::int,
      trips_private=(p_payload->>'trips_private')::int,
      revenue_uber=(p_payload->>'revenue_uber')::numeric,
      revenue_99=(p_payload->>'revenue_99')::numeric,
      revenue_private=(p_payload->>'revenue_private')::numeric,
      tips_extras=(p_payload->>'tips_extras')::numeric,
      fuel_cost=(p_payload->>'fuel_cost')::numeric,
      food_cost=(p_payload->>'food_cost')::numeric,
      wash_cost=(p_payload->>'wash_cost')::numeric,
      other_operational_cost=(p_payload->>'other_operational_cost')::numeric,
      fuel_efficiency_km_l=(p_payload->>'fuel_efficiency_km_l')::numeric,
      fuel_price_reference=(p_payload->>'fuel_price_reference')::numeric,
      odometer_end_km=(p_payload->>'odometer_end_km')::numeric,
      fuel_cash_paid=(p_payload->>'fuel_cash_paid')::numeric,
      fuel_liters=(p_payload->>'fuel_liters')::numeric,
      notes=p_payload->>'notes'
    where id=v_closing.id and revision=p_expected_revision
    returning * into v_closing;
    if not found then raise exception 'Concurrent update; retry with current revision'; end if;
  end if;

  insert into internal_ops.chat_closing_receipts(
    owner_id,idempotency_key,operation_date,payload_hash,closing_id,revision
  ) values(p_owner_id,p_idempotency_key,p_operation_date,v_hash,v_closing.id,v_closing.revision)
  returning * into v_existing;

  return jsonb_build_object('status','committed','receipt_id',v_existing.receipt_id,
    'revision',v_existing.revision,'persisted_at',v_existing.persisted_at,
    'already_recorded',false);
end
$$;

revoke all on function internal_ops.ingest_chat_daily_close(uuid,date,jsonb,text,integer) from public,anon,authenticated;
revoke all on function internal_ops.bump_daily_close_revision() from public,anon,authenticated;
revoke all on function internal_ops.record_daily_close_audit() from public,anon,authenticated;
grant usage on schema internal_ops to service_role;
grant execute on function internal_ops.ingest_chat_daily_close(uuid,date,jsonb,text,integer) to service_role;
