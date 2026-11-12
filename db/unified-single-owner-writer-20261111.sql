-- ChatGPT bridge for the existing single-owner account. Fail closed if the project becomes multi-tenant.
create or replace function internal_ops.ingest_single_owner_chat_daily_close(
  p_operation_date date,
  p_payload jsonb,
  p_idempotency_key text,
  p_expected_revision integer default null
) returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog,public,internal_ops
as $$
declare v_owner uuid;
begin
  if (select count(*) from auth.users) <> 1
     or (select count(distinct owner_id) from public.daily_closings) <> 1 then
    raise exception 'Owner identity is ambiguous; explicit owner binding required';
  end if;
  select u.id into v_owner from auth.users u
    join (select distinct owner_id from public.daily_closings) d on d.owner_id=u.id;
  if v_owner is null then raise exception 'Owner identity not reconciled'; end if;
  return internal_ops.ingest_chat_daily_close(
    v_owner,p_operation_date,p_payload,p_idempotency_key,p_expected_revision
  );
end
$$;
revoke all on function internal_ops.ingest_single_owner_chat_daily_close(date,jsonb,text,integer)
  from public, anon, authenticated;
grant execute on function internal_ops.ingest_single_owner_chat_daily_close(date,jsonb,text,integer)
  to service_role;
