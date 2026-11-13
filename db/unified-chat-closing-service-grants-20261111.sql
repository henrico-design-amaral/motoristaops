-- Permit the authenticated server service to persist idempotency receipts; never grant to anon or authenticated.
grant select, insert on table internal_ops.chat_closing_receipts to service_role;
