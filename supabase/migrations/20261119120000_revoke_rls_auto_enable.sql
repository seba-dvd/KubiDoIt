-- Security Advisor (#38): rls_auto_enable() is the SECURITY DEFINER function behind the
-- "ensure_rls" event trigger that Supabase creates for new projects. It lives in the exposed
-- public schema, so anon and authenticated could call it through the API. The event trigger
-- does not need these grants, so they are revoked. The check keeps the migration working on
-- a database where the function does not exist (for example a local stack).
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;
