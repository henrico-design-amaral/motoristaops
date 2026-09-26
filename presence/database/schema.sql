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
  phone text,
  whatsapp text not null,
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
  brand text,
  model text,
  model_year integer check (model_year between 1990 and 2100),
  color text,
  passenger_capacity integer check (passenger_capacity between 1 and 20),
  is_primary boolean not null default true,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function internal.set_updated_at();

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
  user_id uuid not null references public.profiles(user_id) on delete restrict,
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
  estimated_delivery_date date,
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

create table if not exists public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  state text not null,
  public_message text,
  occurred_at timestamptz not null default now()
);

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
  carrier text,
  tracking_code text,
  status text not null default 'PENDING'
    check (status in (
      'PENDING','QUOTED','LABEL_PURCHASED','READY_FOR_CARRIER',
      'POSTED','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED',
      'DELIVERY_FAILED','CANCELLED'
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
alter table public.order_events enable row level security;
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
  public.products, public.product_inclusions, public.orders, public.order_events,
  public.print_jobs, public.shipments, public.shipment_events
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
),
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger shipping_addresses_set_updated_at
before update on public.shipping_addresses
for each row execute function internal.set_updated_at();

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
  user_id uuid not null references public.profiles(user_id) on delete restrict,
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
  payment_provider text,
  payment_reference text,
  estimated_delivery_date date,
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

create table if not exists public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  state text not null,
  public_message text,
  occurred_at timestamptz not null default now()
);

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
  carrier text,
  tracking_code text,
  status text not null default 'PENDING'
    check (status in (
      'PENDING','QUOTED','LABEL_PURCHASED','READY_FOR_CARRIER',
      'POSTED','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED',
      'DELIVERY_FAILED','CANCELLED'
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

-- RLS
alter table public.profiles enable row level security;
alter table public.driver_pages enable row level security;
alter table public.vehicles enable row level security;
alter table public.driver_services enable row level security;
alter table public.social_links enable row level security;
alter table public.google_business_connections enable row level security;
alter table public.products enable row level security;
alter table public.product_inclusions enable row level security;
alter table public.orders enable row level security;
alter table public.order_events enable row level security;
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
  public.products, public.product_inclusions, public.orders, public.order_events,
  public.print_jobs, public.shipments, public.shipment_events
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
