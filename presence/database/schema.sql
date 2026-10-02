-- MotoristaOPS Presença
-- Canonical draft schema. Not yet applied to Supabase production.
-- PostgreSQL 17 / Supabase-compatible.

create extension if not exists pgcrypto;
create extension if not exists citext;

create schema if not exists internal;

revoke all on schema internal from public;
revoke all on schema internal from anon;
revoke all on schema internal from authenticated;

create or replace function internal.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function internal.set_updated_at() from public;
revoke all on function internal.set_updated_at() from anon;
revoke all on function internal.set_updated_at() from authenticated;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 120),
  full_name text check (full_name is null or char_length(full_name) <= 160),
  phone text check (phone is null or char_length(phone) <= 32),
  whatsapp text not null check (char_length(whatsapp) between 8 and 32),
  locale text not null default 'pt-BR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function internal.set_updated_at();

create table if not exists public.driver_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(user_id) on delete cascade,
  slug citext not null unique,
  display_name text not null check (char_length(display_name) between 2 and 120),
  bio text check (bio is null or char_length(bio) <= 1200),
  template_key text not null default 'driver-standard'
    check (template_key in ('driver-standard','driver-executive','driver-creator','driver-recurring')),
  template_version integer not null default 1 check (template_version > 0),
  publication_status text not null default 'draft'
    check (publication_status in ('draft','published','suspended')),
  confirmed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint driver_pages_slug_format
    check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create trigger driver_pages_set_updated_at
before update on public.driver_pages
for each row execute function internal.set_updated_at();

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  brand text not null check (char_length(brand) between 1 and 80),
  model text not null check (char_length(model) between 1 and 80),
  model_year integer not null check (model_year between 1990 and 2100),
  color text not null check (char_length(color) between 1 and 40),
  passenger_capacity integer check (passenger_capacity between 1 and 20),
  is_primary boolean not null default true,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function internal.set_updated_at();

create unique index if not exists vehicles_one_primary_per_user
on public.vehicles (user_id)
where is_primary;

create table if not exists public.driver_services (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  service_code text not null
    check (service_code in (
      'particular','executive','airport','events','corporate',
      'travel','scheduled','recurring','other'
    )),
  label text,
  sort_order integer not null default 0,
  primary key (user_id, service_code)
);

create table if not exists public.driver_service_areas (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  area_code text not null,
  label text not null check (char_length(label) between 2 and 120),
  sort_order integer not null default 0,
  primary key (user_id, area_code)
);

create table if not exists public.shipping_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  label text not null default 'Principal',
  postal_code text not null check (char_length(postal_code) between 8 and 10),
  street text not null check (char_length(street) between 2 and 160),
  number text not null check (char_length(number) between 1 and 20),
  complement text check (complement is null or char_length(complement) <= 120),
  neighborhood text not null check (char_length(neighborhood) between 2 and 120),
  city text not null check (char_length(city) between 2 and 120),
  state char(2) not null check (state ~ '^[A-Z]{2}$'),
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger shipping_addresses_set_updated_at
before update on public.shipping_addresses
for each row execute function internal.set_updated_at();

create unique index if not exists shipping_addresses_one_default_per_user
on public.shipping_addresses (user_id)
where is_default;

create table if not exists public.social_links (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  platform text not null
    check (platform in ('instagram','linkedin','tiktok','youtube')),
  url text not null check (url ~ '^https://'),
  primary key (user_id, platform)
);

create table if not exists public.google_business_connections (
  user_id uuid primary key references public.profiles(user_id) on delete cascade,
  mode text not null default 'not_requested'
    check (mode in ('not_requested','create','connect_existing')),
  authorization_status text not null default 'not_requested'
    check (authorization_status in ('not_requested','pending','authorized','revoked','error')),
  account_id text,
  location_id text,
  last_sync_at timestamptz,
  updated_at timestamptz not null default now()
);

create trigger google_business_connections_set_updated_at
before update on public.google_business_connections
for each row execute function internal.set_updated_at();

create table if not exists internal.google_business_credentials (
  user_id uuid primary key references public.profiles(user_id) on delete cascade,
  secret_reference text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger google_business_credentials_set_updated_at
before update on internal.google_business_credentials
for each row execute function internal.set_updated_at();

create table if not exists public.products (
  sku text not null,
  version integer not null check (version > 0),
  name text not null,
  status text not null default 'draft'
    check (status in ('draft','active','retired')),
  price_cents bigint check (price_cents is null or price_cents >= 0),
  currency char(3) not null default 'BRL',
  created_at timestamptz not null default now(),
  primary key (sku, version)
);

create table if not exists public.product_inclusions (
  sku text not null,
  version integer not null,
  item_code text not null,
  label text not null,
  quantity integer not null default 1 check (quantity > 0),
  personalized boolean not null default false,
  sort_order integer not null default 0,
  primary key (sku, version, item_code),
  foreign key (sku, version) references public.products(sku, version) on delete cascade
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  product_sku text,
  product_version integer,
  state text not null default 'ACCOUNT_CREATED'
    check (state in (
      'ACCOUNT_CREATED',
      'PRODUCT_SELECTED',
      'PAYMENT_PENDING',
      'PAID',
      'ONBOARDING',
      'DATA_VALID',
      'PREVIEW_READY',
      'CUSTOMER_CONFIRMED',
      'SITE_GENERATED',
      'SITE_PUBLISHED',
      'PRINT_ASSETS_GENERATED',
      'PRINT_PREFLIGHT_PASSED',
      'PRINT_READY',
      'PRINTI_ORDERED',
      'GRAPHICS_RECEIVED',
      'KIT_ASSEMBLY',
      'KIT_PACKED',
      'SHIPPING_QUOTED',
      'LABEL_PURCHASED',
      'READY_FOR_CARRIER',
      'POSTED',
      'IN_TRANSIT',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'ACTIVE'
    )),
  amount_cents bigint check (amount_cents is null or amount_cents >= 0),
  currency char(3) not null default 'BRL',
  shipping_address_id uuid references public.shipping_addresses(id) on delete restrict,
  payment_provider text,
  payment_reference text,
  estimated_dispatch_date date,
  estimated_delivery_date date,
  estimate_confidence text
    check (estimate_confidence is null or estimate_confidence in ('INITIAL','OPERATIONAL','LOGISTICS')),
  estimate_basis text,
  estimate_updated_at timestamptz,
  customer_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (product_sku, product_version)
    references public.products(sku, version)
);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function internal.set_updated_at();

create table if not exists public.order_personalizations (
  order_id uuid primary key references public.orders(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 8 and 32),
  short_service_line text check (short_service_line is null or char_length(short_service_line) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger order_personalizations_set_updated_at
before update on public.order_personalizations
for each row execute function internal.set_updated_at();

create table if not exists public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  state text not null,
  public_message text,
  occurred_at timestamptz not null default now()
);

create table if not exists public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'mercado_pago',
  provider_order_id text,
  idempotency_key text not null unique,
  status text not null default 'CREATED'
    check (status in (
      'CREATED','PROCESSING','APPROVED','FAILED','ACTION_REQUIRED',
      'CANCELED','REFUNDED','PARTIALLY_REFUNDED','UNKNOWN'
    )),
  status_detail text,
  payment_method_type text,
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'BRL',
  checkout_expires_at timestamptz,
  approved_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_order_id)
);

create trigger payment_attempts_set_updated_at
before update on public.payment_attempts
for each row execute function internal.set_updated_at();

create table if not exists public.print_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  status text not null default 'PRINT_ASSETS_GENERATED'
    check (status in (
      'PRINT_ASSETS_GENERATED','PRINT_PREFLIGHT_PASSED',
      'PRINT_READY','PRINTI_ORDERED','GRAPHICS_RECEIVED'
    )),
  supplier text not null default 'Printi',
  supplier_order_reference text,
  supplier_estimated_date date,
  sent_to_supplier_at timestamptz,
  received_at timestamptz,
  updated_at timestamptz not null default now()
);

create trigger print_jobs_set_updated_at
before update on public.print_jobs
for each row execute function internal.set_updated_at();

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  provider text,
  provider_order_id text,
  protocol text,
  carrier text,
  tracking_code text,
  tracking_url text,
  quoted_price_cents bigint check (quoted_price_cents is null or quoted_price_cents >= 0),
  status text not null default 'PENDING'
    check (status in (
      'PENDING','QUOTED','LABEL_PURCHASED','READY_FOR_CARRIER',
      'POSTED','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED',
      'ACTION_REQUIRED','SUSPENDED','DELIVERY_FAILED','CANCELLED'
    )),
  estimated_delivery_date date,
  posted_at timestamptz,
  delivered_at timestamptz,
  updated_at timestamptz not null default now()
);

create trigger shipments_set_updated_at
before update on public.shipments
for each row execute function internal.set_updated_at();

create table if not exists public.shipment_events (
  id bigint generated always as identity primary key,
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  external_event_id text,
  status text not null,
  description text,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  unique (shipment_id, external_event_id)
);

create table if not exists internal.order_snapshots (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  snapshot_kind text not null
    check (snapshot_kind in ('customer_confirmation','public_page','print_source','shipment')),
  payload jsonb not null,
  content_hash text not null,
  created_at timestamptz not null default now(),
  unique (order_id, snapshot_kind, content_hash)
);

create table if not exists internal.publication_artifacts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  snapshot_id uuid not null references internal.order_snapshots(id) on delete restrict,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  public_path text not null,
  template_key text not null
    check (template_key in ('driver-standard','driver-executive','driver-creator','driver-recurring')),
  template_version integer not null check (template_version > 0),
  snapshot_hash text not null check (snapshot_hash ~ '^[a-f0-9]{64}$'),
  artifact_hash text not null check (artifact_hash ~ '^[a-f0-9]{64}$'),
  artifact_bytes bigint not null check (artifact_bytes > 0),
  status text not null default 'GENERATED'
    check (status in ('GENERATED','PUBLISHED')),
  created_at timestamptz not null default now(),
  published_at timestamptz,
  unique (order_id, artifact_hash),
  unique (snapshot_id, artifact_hash)
);

create table if not exists internal.payment_webhook_events (
  id bigint generated always as identity primary key,
  provider text not null,
  external_event_id text not null,
  external_order_id text,
  action text,
  signature_valid boolean not null default false,
  resource_verified boolean not null default false,
  payload jsonb not null,
  payload_hash text not null,
  resource_payload jsonb,
  resource_hash text,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_result text,
  unique (provider, external_event_id)
);

create table if not exists internal.shipping_webhook_events (
  id bigint generated always as identity primary key,
  provider text not null,
  external_order_id text not null,
  event_name text not null,
  signature_valid boolean not null default false,
  payload jsonb not null,
  payload_hash text not null unique,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_result text
);

create table if not exists internal.business_holidays (
  holiday_date date not null,
  jurisdiction text not null default 'BR',
  label text not null,
  created_at timestamptz not null default now(),
  primary key (holiday_date, jurisdiction)
);

create table if not exists internal.inventory_items (
  item_code text primary key,
  name text not null,
  supplier text,
  quantity_on_hand integer not null default 0 check (quantity_on_hand >= 0),
  quantity_reserved integer not null default 0 check (quantity_reserved >= 0),
  reorder_point integer not null default 0 check (reorder_point >= 0),
  unit_cost_cents bigint check (unit_cost_cents is null or unit_cost_cents >= 0),
  lead_time_days integer check (lead_time_days is null or lead_time_days >= 0),
  updated_at timestamptz not null default now(),
  constraint inventory_reserved_not_above_stock
    check (quantity_reserved <= quantity_on_hand)
);

create trigger inventory_items_set_updated_at
before update on internal.inventory_items
for each row execute function internal.set_updated_at();

create table if not exists internal.order_bom_snapshot (
  order_id uuid not null references public.orders(id) on delete cascade,
  item_code text not null,
  label text not null,
  quantity integer not null check (quantity > 0),
  personalized boolean not null default false,
  unit_cost_cents bigint,
  primary key (order_id, item_code)
);

create table if not exists internal.inventory_reservations (
  order_id uuid not null references public.orders(id) on delete cascade,
  item_code text not null references internal.inventory_items(item_code) on delete restrict,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  primary key (order_id, item_code)
);

create table if not exists internal.order_state_transitions (
  from_state text not null,
  to_state text not null,
  primary key (from_state, to_state)
);

insert into internal.order_state_transitions (from_state, to_state)
values
  ('ACCOUNT_CREATED','PRODUCT_SELECTED'),
  ('PRODUCT_SELECTED','PAYMENT_PENDING'),
  ('PAYMENT_PENDING','PAID'),
  ('PAID','ONBOARDING'),
  ('ONBOARDING','DATA_VALID'),
  ('DATA_VALID','PREVIEW_READY'),
  ('PREVIEW_READY','CUSTOMER_CONFIRMED'),
  ('CUSTOMER_CONFIRMED','SITE_GENERATED'),
  ('SITE_GENERATED','SITE_PUBLISHED'),
  ('SITE_PUBLISHED','PRINT_ASSETS_GENERATED'),
  ('PRINT_ASSETS_GENERATED','PRINT_PREFLIGHT_PASSED'),
  ('PRINT_PREFLIGHT_PASSED','PRINT_READY'),
  ('PRINT_READY','PRINTI_ORDERED'),
  ('PRINTI_ORDERED','GRAPHICS_RECEIVED'),
  ('GRAPHICS_RECEIVED','KIT_ASSEMBLY'),
  ('KIT_ASSEMBLY','KIT_PACKED'),
  ('KIT_PACKED','SHIPPING_QUOTED'),
  ('SHIPPING_QUOTED','LABEL_PURCHASED'),
  ('LABEL_PURCHASED','READY_FOR_CARRIER'),
  ('READY_FOR_CARRIER','POSTED'),
  ('POSTED','IN_TRANSIT'),
  ('IN_TRANSIT','OUT_FOR_DELIVERY'),
  ('OUT_FOR_DELIVERY','DELIVERED'),
  ('DELIVERED','ACTIVE')
on conflict do nothing;

create or replace function internal.enforce_order_state_transition()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
begin
  if new.state = old.state then
    return new;
  end if;

  if not exists (
    select 1
    from internal.order_state_transitions t
    where t.from_state = old.state
      and t.to_state = new.state
  ) then
    raise exception 'Invalid order state transition: % -> %', old.state, new.state;
  end if;

  return new;
end;
$$;

revoke all on function internal.enforce_order_state_transition() from public;
revoke all on function internal.enforce_order_state_transition() from anon;
revoke all on function internal.enforce_order_state_transition() from authenticated;

create trigger orders_enforce_state_transition
before update of state on public.orders
for each row execute function internal.enforce_order_state_transition();

create or replace function public.persist_presence_onboarding(
  p_order_id uuid,
  p_payload jsonb
)
returns void
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_user_id uuid;
  v_state text;
  v_address_id uuid;
begin
  if jsonb_typeof(p_payload) <> 'object' then
    raise exception 'Invalid onboarding payload';
  end if;

  select user_id, state
  into v_user_id, v_state
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_state <> 'ONBOARDING' then
    raise exception 'Order must be in ONBOARDING, got %', v_state;
  end if;

  if coalesce(p_payload->>'slug', '') !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
     or char_length(p_payload->>'slug') not between 3 and 64 then
    raise exception 'Invalid slug';
  end if;

  if jsonb_typeof(p_payload->'services') <> 'array'
     or jsonb_array_length(p_payload->'services') < 1 then
    raise exception 'At least one service is required';
  end if;

  if jsonb_typeof(p_payload->'serviceAreas') <> 'array'
     or jsonb_array_length(p_payload->'serviceAreas') < 1 then
    raise exception 'At least one service area is required';
  end if;

  insert into public.profiles (user_id, display_name, full_name, phone, whatsapp)
  values (
    v_user_id,
    p_payload#>>'{profile,displayName}',
    nullif(p_payload#>>'{profile,fullName}', ''),
    nullif(p_payload#>>'{profile,phone}', ''),
    p_payload#>>'{profile,whatsapp}'
  )
  on conflict (user_id) do update
  set display_name = excluded.display_name,
      full_name = excluded.full_name,
      phone = excluded.phone,
      whatsapp = excluded.whatsapp;

  insert into public.driver_pages (user_id, slug, display_name, bio)
  values (
    v_user_id,
    p_payload->>'slug',
    p_payload#>>'{profile,displayName}',
    nullif(p_payload#>>'{profile,bio}', '')
  )
  on conflict (user_id) do update
  set slug = excluded.slug,
      display_name = excluded.display_name,
      bio = excluded.bio;

  insert into public.vehicles (
    user_id, brand, model, model_year, color, passenger_capacity, is_primary, is_public
  )
  values (
    v_user_id,
    p_payload#>>'{vehicle,brand}',
    p_payload#>>'{vehicle,model}',
    (p_payload#>>'{vehicle,year}')::integer,
    p_payload#>>'{vehicle,color}',
    nullif(p_payload#>>'{vehicle,capacity}', '')::integer,
    true,
    true
  )
  on conflict (user_id) where is_primary do update
  set brand = excluded.brand,
      model = excluded.model,
      model_year = excluded.model_year,
      color = excluded.color,
      passenger_capacity = excluded.passenger_capacity,
      is_public = excluded.is_public;

  delete from public.driver_services where user_id = v_user_id;
  insert into public.driver_services (user_id, service_code, sort_order)
  select v_user_id, value, ordinality::integer
  from jsonb_array_elements_text(p_payload->'services') with ordinality;

  delete from public.driver_service_areas where user_id = v_user_id;
  insert into public.driver_service_areas (user_id, area_code, label, sort_order)
  select
    v_user_id,
    'area-' || lpad(ordinality::text, 3, '0'),
    value,
    ordinality::integer
  from jsonb_array_elements_text(p_payload->'serviceAreas') with ordinality;

  delete from public.social_links where user_id = v_user_id;
  insert into public.social_links (user_id, platform, url)
  select v_user_id, key, value #>> '{}'
  from jsonb_each(p_payload->'socialLinks')
  where value <> 'null'::jsonb;

  insert into public.google_business_connections (user_id, mode)
  values (v_user_id, p_payload#>>'{googleBusiness,mode}')
  on conflict (user_id) do update
  set mode = excluded.mode;

  insert into public.order_personalizations (
    order_id, display_name, whatsapp, short_service_line
  )
  values (
    p_order_id,
    p_payload#>>'{printPersonalization,displayName}',
    p_payload#>>'{printPersonalization,whatsapp}',
    nullif(p_payload#>>'{printPersonalization,shortServiceLine}', '')
  )
  on conflict (order_id) do update
  set display_name = excluded.display_name,
      whatsapp = excluded.whatsapp,
      short_service_line = excluded.short_service_line;

  insert into public.shipping_addresses (
    user_id, label, postal_code, street, number, complement,
    neighborhood, city, state, is_default
  )
  values (
    v_user_id,
    'Principal',
    p_payload#>>'{shippingAddress,postalCode}',
    p_payload#>>'{shippingAddress,street}',
    p_payload#>>'{shippingAddress,number}',
    nullif(p_payload#>>'{shippingAddress,complement}', ''),
    p_payload#>>'{shippingAddress,neighborhood}',
    p_payload#>>'{shippingAddress,city}',
    p_payload#>>'{shippingAddress,state}',
    true
  )
  on conflict (user_id) where is_default do update
  set postal_code = excluded.postal_code,
      street = excluded.street,
      number = excluded.number,
      complement = excluded.complement,
      neighborhood = excluded.neighborhood,
      city = excluded.city,
      state = excluded.state
  returning id into v_address_id;

  update public.orders
  set shipping_address_id = v_address_id,
      state = 'DATA_VALID'
  where id = p_order_id;

  insert into public.order_events (order_id, state, public_message)
  values (p_order_id, 'DATA_VALID', 'Cadastro validado.');
end;
$$;

revoke all on function public.persist_presence_onboarding(uuid, jsonb) from public;
revoke all on function public.persist_presence_onboarding(uuid, jsonb) from anon;
revoke all on function public.persist_presence_onboarding(uuid, jsonb) from authenticated;
grant execute on function public.persist_presence_onboarding(uuid, jsonb) to service_role;

create or replace function internal.build_presence_public_snapshot(
  p_order_id uuid
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_user_id uuid;
  v_page public.driver_pages%rowtype;
  v_profile public.profiles%rowtype;
  v_vehicle public.vehicles%rowtype;
  v_whatsapp_digits text;
  v_services jsonb;
  v_service_areas text;
  v_social_summary text;
  v_instagram text;
  v_linkedin text;
begin
  select user_id
  into v_user_id
  from public.orders
  where id = p_order_id;

  if not found then
    raise exception 'Order not found';
  end if;

  select *
  into v_page
  from public.driver_pages
  where user_id = v_user_id;

  if not found then
    raise exception 'Driver page not found';
  end if;

  select *
  into v_profile
  from public.profiles
  where user_id = v_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;

  select *
  into v_vehicle
  from public.vehicles
  where user_id = v_user_id
    and is_primary;

  if not found then
    raise exception 'Primary vehicle not found';
  end if;

  v_whatsapp_digits := regexp_replace(v_profile.whatsapp, '[^0-9]', '', 'g');
  if char_length(v_whatsapp_digits) < 8 then
    raise exception 'Invalid public WhatsApp';
  end if;

  select jsonb_agg(
    jsonb_build_object(
      'label',
      case service_code
        when 'particular' then 'Particular'
        when 'executive' then 'Executivo'
        when 'airport' then 'Aeroportos'
        when 'events' then 'Eventos'
        when 'corporate' then 'Corporativo'
        when 'travel' then 'Viagens'
        when 'scheduled' then 'Agendamentos'
        when 'recurring' then 'Recorrente'
        else coalesce(nullif(label, ''), 'Outro')
      end,
      'description', ''
    )
    order by sort_order, service_code
  )
  into v_services
  from public.driver_services
  where user_id = v_user_id;

  if v_services is null or jsonb_array_length(v_services) = 0 then
    raise exception 'Public services missing';
  end if;

  select string_agg(label, ', ' order by sort_order, area_code)
  into v_service_areas
  from public.driver_service_areas
  where user_id = v_user_id;

  if coalesce(v_service_areas, '') = '' then
    raise exception 'Public service areas missing';
  end if;

  select
    max(url) filter (where platform = 'instagram'),
    max(url) filter (where platform = 'linkedin'),
    string_agg(
      case platform
        when 'instagram' then 'Instagram'
        when 'linkedin' then 'LinkedIn'
        when 'tiktok' then 'TikTok'
        when 'youtube' then 'YouTube'
        else platform
      end,
      ', '
      order by platform
    )
  into v_instagram, v_linkedin, v_social_summary
  from public.social_links
  where user_id = v_user_id;

  v_social_summary := coalesce(nullif(v_social_summary, ''), 'WhatsApp');

  return jsonb_build_object(
    'slug', v_page.slug::text,
    'templateKey', v_page.template_key,
    'templateVersion', v_page.template_version,
    'renderData', jsonb_build_object(
      'driver', jsonb_build_object(
        'display_name', v_page.display_name,
        'meta_description', left(coalesce(nullif(v_page.bio, ''), v_page.display_name), 160),
        'bio', coalesce(nullif(v_page.bio, ''), v_page.display_name),
        'whatsapp_url', 'https://wa.me/' || v_whatsapp_digits,
        'whatsapp_display', v_profile.whatsapp,
        'instagram', v_instagram,
        'linkedin', v_linkedin
      ),
      'vehicle', jsonb_build_object(
        'brand', v_vehicle.brand,
        'model', v_vehicle.model,
        'year', v_vehicle.model_year,
        'color', v_vehicle.color
      ),
      'services', v_services,
      'service_areas_text', v_service_areas,
      'social_summary', v_social_summary
    )
  );
end;
$$;

revoke all on function internal.build_presence_public_snapshot(uuid) from public;
revoke all on function internal.build_presence_public_snapshot(uuid) from anon;
revoke all on function internal.build_presence_public_snapshot(uuid) from authenticated;

create or replace function public.prepare_presence_preview(
  p_order_id uuid
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_state text;
  v_payload jsonb;
begin
  select state
  into v_state
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_state not in ('DATA_VALID', 'PREVIEW_READY') then
    raise exception 'Order must be in DATA_VALID or PREVIEW_READY, got %', v_state;
  end if;

  v_payload := internal.build_presence_public_snapshot(p_order_id);

  if v_state = 'DATA_VALID' then
    update public.orders
    set state = 'PREVIEW_READY'
    where id = p_order_id;

    insert into public.order_events (order_id, state, public_message)
    values (p_order_id, 'PREVIEW_READY', 'Prévia pronta para revisão.');
  end if;

  return v_payload;
end;
$$;

revoke all on function public.prepare_presence_preview(uuid) from public;
revoke all on function public.prepare_presence_preview(uuid) from anon;
revoke all on function public.prepare_presence_preview(uuid) from authenticated;
grant execute on function public.prepare_presence_preview(uuid) to service_role;

create or replace function public.confirm_presence_preview(
  p_order_id uuid
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_state text;
  v_user_id uuid;
  v_payload jsonb;
  v_hash text;
begin
  select state, user_id
  into v_state, v_user_id
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_state <> 'PREVIEW_READY' then
    raise exception 'Order must be in PREVIEW_READY, got %', v_state;
  end if;

  v_payload := internal.build_presence_public_snapshot(p_order_id);
  v_hash := encode(digest(convert_to(v_payload::text, 'UTF8'), 'sha256'), 'hex');

  insert into internal.order_snapshots (
    order_id, snapshot_kind, payload, content_hash
  )
  values (
    p_order_id, 'public_page', v_payload, v_hash
  );

  update public.driver_pages
  set confirmed_at = now()
  where user_id = v_user_id;

  update public.orders
  set customer_confirmed_at = now(),
      state = 'CUSTOMER_CONFIRMED'
  where id = p_order_id;

  insert into public.order_events (order_id, state, public_message)
  values (p_order_id, 'CUSTOMER_CONFIRMED', 'Conteúdo confirmado.');

  return v_payload;
end;
$$;

revoke all on function public.confirm_presence_preview(uuid) from public;
revoke all on function public.confirm_presence_preview(uuid) from anon;
revoke all on function public.confirm_presence_preview(uuid) from authenticated;
grant execute on function public.confirm_presence_preview(uuid) to service_role;

create or replace function public.record_presence_site_generated(
  p_order_id uuid,
  p_snapshot_hash text,
  p_artifact_hash text,
  p_artifact_bytes bigint
)
returns uuid
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_state text;
  v_snapshot_id uuid;
  v_payload jsonb;
  v_slug text;
  v_template_key text;
  v_template_version integer;
  v_artifact_id uuid;
begin
  if p_snapshot_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid snapshot hash';
  end if;

  if p_artifact_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid artifact hash';
  end if;

  if p_artifact_bytes is null or p_artifact_bytes <= 0 then
    raise exception 'Invalid artifact byte count';
  end if;

  select state
  into v_state
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_state <> 'CUSTOMER_CONFIRMED' then
    raise exception 'Order must be in CUSTOMER_CONFIRMED, got %', v_state;
  end if;

  select id, payload
  into v_snapshot_id, v_payload
  from internal.order_snapshots
  where order_id = p_order_id
    and snapshot_kind = 'public_page'
    and content_hash = p_snapshot_hash
  order by created_at desc
  limit 1;

  if not found then
    raise exception 'Confirmed public snapshot hash not found';
  end if;

  v_slug := v_payload->>'slug';
  v_template_key := v_payload->>'templateKey';
  v_template_version := (v_payload->>'templateVersion')::integer;

  insert into internal.publication_artifacts (
    order_id, snapshot_id, slug, public_path,
    template_key, template_version,
    snapshot_hash, artifact_hash, artifact_bytes
  )
  values (
    p_order_id, v_snapshot_id, v_slug, '/' || v_slug || '/index.html',
    v_template_key, v_template_version,
    p_snapshot_hash, p_artifact_hash, p_artifact_bytes
  )
  returning id into v_artifact_id;

  update public.orders
  set state = 'SITE_GENERATED'
  where id = p_order_id;

  insert into public.order_events (order_id, state, public_message)
  values (p_order_id, 'SITE_GENERATED', 'Página gerada e validada.');

  return v_artifact_id;
end;
$$;

revoke all on function public.record_presence_site_generated(uuid, text, text, bigint) from public;
revoke all on function public.record_presence_site_generated(uuid, text, text, bigint) from anon;
revoke all on function public.record_presence_site_generated(uuid, text, text, bigint) from authenticated;
grant execute on function public.record_presence_site_generated(uuid, text, text, bigint) to service_role;

create or replace function public.mark_presence_site_published(
  p_order_id uuid,
  p_artifact_hash text
)
returns void
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_state text;
  v_user_id uuid;
  v_artifact_id uuid;
begin
  if p_artifact_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid artifact hash';
  end if;

  select state, user_id
  into v_state, v_user_id
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_state <> 'SITE_GENERATED' then
    raise exception 'Order must be in SITE_GENERATED, got %', v_state;
  end if;

  select id
  into v_artifact_id
  from internal.publication_artifacts
  where order_id = p_order_id
    and artifact_hash = p_artifact_hash
    and status = 'GENERATED'
  order by created_at desc
  limit 1;

  if not found then
    raise exception 'Generated publication artifact not found';
  end if;

  update internal.publication_artifacts
  set status = 'PUBLISHED',
      published_at = now()
  where id = v_artifact_id;

  update public.driver_pages
  set publication_status = 'published',
      published_at = now()
  where user_id = v_user_id;

  update public.orders
  set state = 'SITE_PUBLISHED'
  where id = p_order_id;

  insert into public.order_events (order_id, state, public_message)
  values (p_order_id, 'SITE_PUBLISHED', 'Página publicada.');
end;
$$;

revoke all on function public.mark_presence_site_published(uuid, text) from public;
revoke all on function public.mark_presence_site_published(uuid, text) from anon;
revoke all on function public.mark_presence_site_published(uuid, text) from authenticated;
grant execute on function public.mark_presence_site_published(uuid, text) to service_role;

create or replace function public.process_presence_mercado_pago_payment(
  p_order_id uuid,
  p_external_event_id text,
  p_provider_order_id text,
  p_signature_valid boolean,
  p_webhook_payload jsonb,
  p_webhook_payload_hash text,
  p_resource_payload jsonb
)
returns text
language plpgsql
security invoker
set search_path = pg_catalog, public, internal
as $$
declare
  v_order_state text;
  v_order_amount bigint;
  v_order_currency char(3);
  v_attempt_id uuid;
  v_attempt_amount bigint;
  v_attempt_currency char(3);
  v_existing_result text;
  v_existing_hash text;
  v_resource_id text;
  v_resource_status text;
  v_resource_detail text;
  v_external_reference text;
  v_resource_currency text;
  v_resource_amount numeric;
  v_resource_hash text;
  v_result text;
begin
  if coalesce(p_external_event_id, '') = '' then
    raise exception 'Missing Mercado Pago event id';
  end if;

  if coalesce(p_provider_order_id, '') = '' then
    raise exception 'Missing Mercado Pago order id';
  end if;

  if p_webhook_payload_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid webhook payload hash';
  end if;

  if jsonb_typeof(p_webhook_payload) <> 'object' then
    raise exception 'Invalid webhook payload';
  end if;

  if jsonb_typeof(p_resource_payload) <> 'object' then
    raise exception 'Invalid Mercado Pago resource payload';
  end if;

  select processing_result, payload_hash
  into v_existing_result, v_existing_hash
  from internal.payment_webhook_events
  where provider = 'mercado_pago'
    and external_event_id = p_external_event_id;

  if found then
    if v_existing_hash <> p_webhook_payload_hash then
      raise exception 'Webhook event id reused with different payload';
    end if;
    return coalesce(v_existing_result, 'RECORDED');
  end if;

  v_resource_hash := encode(
    digest(convert_to(p_resource_payload::text, 'UTF8'), 'sha256'),
    'hex'
  );

  insert into internal.payment_webhook_events (
    provider, external_event_id, external_order_id, action,
    signature_valid, resource_verified,
    payload, payload_hash, resource_payload, resource_hash,
    processing_result
  )
  values (
    'mercado_pago',
    p_external_event_id,
    p_provider_order_id,
    p_webhook_payload->>'action',
    p_signature_valid,
    false,
    p_webhook_payload,
    p_webhook_payload_hash,
    p_resource_payload,
    v_resource_hash,
    'RECORDED'
  );

  if not p_signature_valid then
    v_result := 'REJECTED_SIGNATURE';
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end if;

  select state, amount_cents, currency
  into v_order_state, v_order_amount, v_order_currency
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    v_result := 'REJECTED_ORDER_NOT_FOUND';
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end if;

  if v_order_state <> 'PAYMENT_PENDING' then
    v_result := 'REJECTED_ORDER_STATE';
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end if;

  select id, amount_cents, currency
  into v_attempt_id, v_attempt_amount, v_attempt_currency
  from public.payment_attempts
  where order_id = p_order_id
    and provider = 'mercado_pago'
    and provider_order_id = p_provider_order_id
  order by created_at desc
  limit 1
  for update;

  if not found then
    v_result := 'REJECTED_PAYMENT_ATTEMPT';
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end if;

  v_resource_id := p_resource_payload->>'id';
  v_resource_status := lower(coalesce(p_resource_payload->>'status', ''));
  v_resource_detail := lower(coalesce(p_resource_payload->>'status_detail', ''));
  v_external_reference := p_resource_payload->>'external_reference';
  v_resource_currency := upper(coalesce(p_resource_payload->>'currency', ''));

  begin
    v_resource_amount := (p_resource_payload->>'total_amount')::numeric;
  exception when others then
    v_result := 'REJECTED_RESOURCE_AMOUNT';
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end;

  if v_resource_id <> p_provider_order_id then
    v_result := 'REJECTED_RESOURCE_ID';
  elsif v_external_reference <> p_order_id::text then
    v_result := 'REJECTED_EXTERNAL_REFERENCE';
  elsif v_resource_status <> 'processed' or v_resource_detail <> 'accredited' then
    v_result := 'REJECTED_RESOURCE_STATUS';
  elsif v_order_amount is null or v_resource_amount <> (v_order_amount::numeric / 100) then
    v_result := 'REJECTED_ORDER_AMOUNT';
  elsif v_attempt_amount <> v_order_amount then
    v_result := 'REJECTED_ATTEMPT_AMOUNT';
  elsif v_resource_currency <> trim(v_order_currency) or trim(v_attempt_currency) <> trim(v_order_currency) then
    v_result := 'REJECTED_CURRENCY';
  else
    v_result := 'PAID';
  end if;

  if v_result <> 'PAID' then
    update internal.payment_webhook_events
    set processed_at = now(), processing_result = v_result
    where provider = 'mercado_pago'
      and external_event_id = p_external_event_id;
    return v_result;
  end if;

  update internal.payment_webhook_events
  set resource_verified = true,
      processed_at = now(),
      processing_result = 'PAID'
  where provider = 'mercado_pago'
    and external_event_id = p_external_event_id;

  update public.payment_attempts
  set status = 'APPROVED',
      approved_at = now(),
      status_detail = v_resource_detail
  where id = v_attempt_id;

  update public.orders
  set payment_provider = 'mercado_pago',
      payment_reference = p_provider_order_id,
      state = 'PAID'
  where id = p_order_id;

  insert into public.order_events (order_id, state, public_message)
  values (p_order_id, 'PAID', 'Pagamento confirmado.');

  return 'PAID';
end;
$$;

revoke all on function public.process_presence_mercado_pago_payment(
  uuid, text, text, boolean, jsonb, text, jsonb
) from public;
revoke all on function public.process_presence_mercado_pago_payment(
  uuid, text, text, boolean, jsonb, text, jsonb
) from anon;
revoke all on function public.process_presence_mercado_pago_payment(
  uuid, text, text, boolean, jsonb, text, jsonb
) from authenticated;
grant execute on function public.process_presence_mercado_pago_payment(
  uuid, text, text, boolean, jsonb, text, jsonb
) to service_role;

-- RLS
alter table public.profiles enable row level security;
alter table public.driver_pages enable row level security;
alter table public.vehicles enable row level security;
alter table public.driver_services enable row level security;
alter table public.driver_service_areas enable row level security;
alter table public.shipping_addresses enable row level security;
alter table public.social_links enable row level security;
alter table public.google_business_connections enable row level security;
alter table public.products enable row level security;
alter table public.product_inclusions enable row level security;
alter table public.orders enable row level security;
alter table public.order_personalizations enable row level security;
alter table public.order_events enable row level security;
alter table public.payment_attempts enable row level security;
alter table public.print_jobs enable row level security;
alter table public.shipments enable row level security;
alter table public.shipment_events enable row level security;

create policy profiles_owner_select
on public.profiles for select
to authenticated
using ((select auth.uid()) = user_id);

create policy profiles_owner_insert
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy profiles_owner_update
on public.profiles for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy driver_pages_public_select
on public.driver_pages for select
to anon, authenticated
using (publication_status = 'published');

create policy driver_pages_owner_select
on public.driver_pages for select
to authenticated
using ((select auth.uid()) = user_id);

create policy driver_pages_owner_insert
on public.driver_pages for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy driver_pages_owner_update
on public.driver_pages for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy vehicles_public_select
on public.vehicles for select
to anon, authenticated
using (
  is_public
  and exists (
    select 1
    from public.driver_pages p
    where p.user_id = vehicles.user_id
      and p.publication_status = 'published'
  )
);

create policy vehicles_owner_all
on public.vehicles for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy services_public_select
on public.driver_services for select
to anon, authenticated
using (
  exists (
    select 1
    from public.driver_pages p
    where p.user_id = driver_services.user_id
      and p.publication_status = 'published'
  )
);

create policy services_owner_all
on public.driver_services for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy service_areas_public_select
on public.driver_service_areas for select
to anon, authenticated
using (
  exists (
    select 1
    from public.driver_pages p
    where p.user_id = driver_service_areas.user_id
      and p.publication_status = 'published'
  )
);

create policy service_areas_owner_all
on public.driver_service_areas for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy shipping_addresses_owner_all
on public.shipping_addresses for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy social_links_public_select
on public.social_links for select
to anon, authenticated
using (
  exists (
    select 1
    from public.driver_pages p
    where p.user_id = social_links.user_id
      and p.publication_status = 'published'
  )
);

create policy social_links_owner_all
on public.social_links for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy google_business_owner_select
on public.google_business_connections for select
to authenticated
using ((select auth.uid()) = user_id);

create policy products_public_select
on public.products for select
to anon, authenticated
using (status = 'active');

create policy product_inclusions_public_select
on public.product_inclusions for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products p
    where p.sku = product_inclusions.sku
      and p.version = product_inclusions.version
      and p.status = 'active'
  )
);

create policy orders_owner_select
on public.orders for select
to authenticated
using ((select auth.uid()) = user_id);

create policy order_personalizations_owner_select
on public.order_personalizations for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_personalizations.order_id
      and o.user_id = (select auth.uid())
  )
);

create policy order_events_owner_select
on public.order_events for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_events.order_id
      and o.user_id = (select auth.uid())
  )
);

create policy payment_attempts_owner_select
on public.payment_attempts for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = payment_attempts.order_id
      and o.user_id = (select auth.uid())
  )
);

create policy print_jobs_owner_select
on public.print_jobs for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = print_jobs.order_id
      and o.user_id = (select auth.uid())
  )
);

create policy shipments_owner_select
on public.shipments for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = shipments.order_id
      and o.user_id = (select auth.uid())
  )
);

create policy shipment_events_owner_select
on public.shipment_events for select
to authenticated
using (
  exists (
    select 1
    from public.shipments s
    join public.orders o on o.id = s.order_id
    where s.id = shipment_events.shipment_id
      and o.user_id = (select auth.uid())
  )
);

-- Explicit grants. Critical state changes remain server-side only.
grant usage on schema public to anon, authenticated;

grant select on public.driver_pages, public.vehicles, public.driver_services,
  public.driver_service_areas, public.social_links, public.products, public.product_inclusions
to anon;

grant select on public.profiles, public.driver_pages, public.vehicles,
  public.driver_services, public.driver_service_areas, public.shipping_addresses,
  public.social_links, public.google_business_connections,
  public.products, public.product_inclusions, public.orders, public.order_personalizations,
  public.order_events, public.payment_attempts, public.print_jobs, public.shipments, public.shipment_events
to authenticated;

grant insert on public.profiles, public.driver_pages, public.vehicles,
  public.driver_services, public.driver_service_areas, public.shipping_addresses,
  public.social_links
to authenticated;

grant update (display_name, phone, whatsapp, locale)
on public.profiles to authenticated;

grant update (slug, display_name, bio, template_key, template_version)
on public.driver_pages to authenticated;

grant update (brand, model, model_year, color, passenger_capacity, is_primary, is_public)
on public.vehicles to authenticated;

grant update (label, sort_order)
on public.driver_services to authenticated;

grant update (label, sort_order)
on public.driver_service_areas to authenticated;

grant update (label, postal_code, street, number, complement, neighborhood, city, state, is_default)
on public.shipping_addresses to authenticated;

grant update (url)
on public.social_links to authenticated;

-- Draft product definition. No commercial price is set yet.
insert into public.products (sku, version, name, status, price_cents, currency)
values ('PRESENCE_COMPLETE', 1, 'MotoristaOPS Presença Completa', 'draft', null, 'BRL')
on conflict (sku, version) do nothing;

insert into public.product_inclusions
  (sku, version, item_code, label, quantity, personalized, sort_order)
values
  ('PRESENCE_COMPLETE',1,'landing_page','Landing page MotoristaOPS',1,true,10),
  ('PRESENCE_COMPLETE',1,'google_business','Google Business',1,true,20),
  ('PRESENCE_COMPLETE',1,'instagram','Instagram — presença por link',1,false,30),
  ('PRESENCE_COMPLETE',1,'linkedin','LinkedIn — presença por link',1,false,40),
  ('PRESENCE_COMPLETE',1,'business_card','Cartão de visita',1,true,50),
  ('PRESENCE_COMPLETE',1,'identification_plate','Placa de identificação',1,true,60),
  ('PRESENCE_COMPLETE',1,'organizer','Organizador',1,false,70),
  ('PRESENCE_COMPLETE',1,'candy_pack','Pacote de bala',1,false,80),
  ('PRESENCE_COMPLETE',1,'car_trash_bin','Lixinho automotivo',1,false,90),
  ('PRESENCE_COMPLETE',1,'wet_wipes','Lenço umedecido',1,false,100),
  ('PRESENCE_COMPLETE',1,'dry_tissues','Lenço seco',1,false,110),
  ('PRESENCE_COMPLETE',1,'hand_sanitizer','Álcool em gel',1,false,120),
  ('PRESENCE_COMPLETE',1,'gift','Brinde MotoristaOPS',1,true,130)
on conflict do nothing;


-- Explicit server-side privileges for transactional orchestration.
grant usage on schema internal to service_role;
grant execute on function internal.set_updated_at() to service_role;
grant execute on function internal.enforce_order_state_transition() to service_role;
grant execute on function internal.build_presence_public_snapshot(uuid) to service_role;
grant select on internal.order_state_transitions to service_role;
grant select, insert on internal.order_snapshots to service_role;
grant select, insert, update on internal.publication_artifacts to service_role;
grant select, insert, update on internal.payment_webhook_events to service_role;

grant select, insert, update, delete on public.profiles, public.driver_pages, public.vehicles,
  public.driver_services, public.driver_service_areas, public.shipping_addresses, public.social_links,
  public.google_business_connections, public.orders, public.order_personalizations, public.order_events,
  public.payment_attempts
to service_role;

grant usage, select on all sequences in schema public to service_role;
