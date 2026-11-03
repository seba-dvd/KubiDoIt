-- Testul RLS pentru public.tasks și public.categories (issue #21).
--
-- Cum se rulează: Supabase Dashboard → SQL Editor → lipești tot fișierul → Run.
--   - toate verificările trec  → „Success. No rows returned”
--   - o verificare pică        → eroarea afișează mesajul ei
-- Fișierul își creează singur userii A și B; `rollback` de la final anulează tot,
-- deci în bază nu rămâne nimic.
--
-- Nu e un test pgTAP: nu se rulează cu `supabase test db`.

begin;

-- 0. Doi useri de test, care există doar în această tranzacție
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'rls-a@test.local'),
  ('00000000-0000-0000-0000-00000000000b', 'rls-b@test.local');

-- 1. Ca A
select set_config('request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);
set local role authenticated;

-- 1a. INSERT: user_id se completează singur din auth.uid()
insert into public.tasks (title, due_at) values ('Activitatea lui A', now() + interval '1 day');

-- 1b. SELECT: A își vede activitatea
do $$
begin
  assert (select count(*) from public.tasks) = 1,
    'A nu își vede propria activitate';
  assert (select user_id from public.tasks limit 1) = '00000000-0000-0000-0000-00000000000a',
    'user_id nu a fost completat cu ID-ul lui A';
end $$;

-- 1c. INSERT: A nu poate crea o activitate pe numele lui B
do $$
begin
  insert into public.tasks (user_id, title, due_at)
  values ('00000000-0000-0000-0000-00000000000b', 'Falsă', now());
  raise exception 'A a putut crea o activitate pe numele lui B';
exception
  when insufficient_privilege then null;  -- blocat de RLS, cum trebuie
end $$;

-- 1d. INSERT: A nu poate crea o categorie predefinită (user_id NULL)
do $$
begin
  insert into public.categories (user_id, name) values (null, 'Falsă');
  raise exception 'A a putut crea o categorie predefinită';
exception
  when insufficient_privilege then null;
end $$;

-- 2. Ca B
reset role;
select set_config('request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-00000000000b","role":"authenticated"}', true);
set local role authenticated;

do $$
declare
  n int;
begin
  -- 2a. SELECT: B nu vede activitatea lui A
  assert (select count(*) from public.tasks) = 0,
    'B vede activitatea lui A';

  -- 2b. UPDATE: B nu poate modifica activitatea lui A
  update public.tasks set title = 'modificat de B';
  get diagnostics n = row_count;
  assert n = 0, 'B a modificat activitatea lui A';

  -- 2c. DELETE: B nu poate șterge activitatea lui A
  delete from public.tasks;
  get diagnostics n = row_count;
  assert n = 0, 'B a șters activitatea lui A';

  -- 2d. B vede doar cele 3 categorii predefinite
  assert (select count(*) from public.categories) = 3,
    'B nu vede exact cele 3 categorii predefinite';

  -- 2e. UPDATE / DELETE: B nu poate schimba categoriile predefinite
  update public.categories set name = 'modificat de B';
  get diagnostics n = row_count;
  assert n = 0, 'B a modificat o categorie predefinită';

  delete from public.categories;
  get diagnostics n = row_count;
  assert n = 0, 'B a șters o categorie predefinită';
end $$;

-- 2f. B își creează o categorie proprie (folosită la pasul 3)
insert into public.categories (id, name)
values ('00000000-0000-0000-0000-0000000000cb', 'Categoria lui B');

-- 3. Înapoi ca A: activitatea e neatinsă după încercările lui B
reset role;
select set_config('request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);
set local role authenticated;

do $$
begin
  assert (select title from public.tasks limit 1) = 'Activitatea lui A',
    'activitatea lui A a fost modificată sau ștearsă de B';

  -- 3a. A nu vede categoria lui B
  assert (select count(*) from public.categories) = 3,
    'A vede categoria lui B';
end $$;

-- 3b. A poate folosi o categorie predefinită
insert into public.tasks (title, due_at, category_id)
values ('Cu categoria Muncă', now(), '00000000-0000-4000-8000-000000000001');

-- 3c. A nu poate lega o activitate de categoria lui B (cheia străină ignoră RLS,
--     dar politica verifică explicit că categoria e vizibilă utilizatorului)
do $$
begin
  insert into public.tasks (title, due_at, category_id)
  values ('Cu categoria lui B', now(), '00000000-0000-0000-0000-0000000000cb');
  raise exception 'A a folosit categoria lui B';
exception
  when insufficient_privilege then null;
end $$;

-- 4. Ca anon (fără login): nu are acces la tabele
reset role;
set local role anon;

do $$
begin
  perform 1 from public.tasks;
  raise exception 'anon poate citi public.tasks';
exception
  when insufficient_privilege then null;  -- permission denied, cum trebuie
end $$;

do $$
begin
  perform 1 from public.categories;
  raise exception 'anon poate citi public.categories';
exception
  when insufficient_privilege then null;
end $$;

rollback;
