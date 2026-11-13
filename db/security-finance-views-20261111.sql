-- Protect the existing operational monthly view from anonymous reads and RLS bypass.
alter view public.monthly_financial_summary set (security_invoker = true);
revoke all privileges on public.monthly_financial_summary from anon;
-- Trigger helper must resolve catalog functions deterministically.
alter function public.set_updated_at() set search_path = pg_catalog, public;
