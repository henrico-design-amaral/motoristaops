-- Read-only authenticated projection of bank KPIs. The canonical source remains Banco MCP/Neon.
create table if not exists public.finance_monthly_readmodel (
  owner_id uuid not null references auth.users(id) on delete cascade,
  competence_month date not null,
  bank_balance_total numeric,
  month_inflows numeric,
  month_outflows numeric,
  month_net numeric,
  work_income numeric,
  family_support numeric,
  reserve_balance numeric,
  upcoming_dues numeric,
  data_quality text not null check(data_quality in ('partial','confirmed')),
  source_label text not null,
  source_as_of timestamptz not null,
  updated_at timestamptz not null default now(),
  primary key(owner_id,competence_month),
  constraint finance_monthly_first_day check (extract(day from competence_month)=1)
);
alter table public.finance_monthly_readmodel enable row level security;
revoke all privileges on table public.finance_monthly_readmodel from anon, authenticated, public;
grant select on table public.finance_monthly_readmodel to authenticated;
grant select,insert,update on table public.finance_monthly_readmodel to service_role;
create policy finance_monthly_read_own on public.finance_monthly_readmodel
  for select to authenticated using (owner_id = (select auth.uid()));
