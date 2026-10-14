-- KubiDoIt – schema inițială (R1–R7)
--
-- Statusurile Overdue / Upcoming NU se salvează: se calculează mereu în client, cu
-- computeStatus() din @kubidoit/shared. În baza de date stă doar statusul setat manual
-- (completed / canceled). Grupurile (R8) vin într-o migrație separată.

-- ---------------------------------------------------------------------------
-- Categorii (R4): user_id NULL = categorie predefinită, vizibilă tuturor
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 40),
  color text check (color ~ '^#[0-9A-Fa-f]{6}$'),
  created_at timestamptz not null default now(),
  unique nulls not distinct (user_id, name)
);

create index categories_user_id_idx on public.categories (user_id);

insert into public.categories (id, user_id, name, color) values
  ('00000000-0000-4000-8000-000000000001', null, 'Muncă', '#1E88E5'),
  ('00000000-0000-4000-8000-000000000002', null, 'Școală', '#8E24AA'),
  ('00000000-0000-4000-8000-000000000003', null, 'Sală', '#43A047');

-- ---------------------------------------------------------------------------
-- Activități (R1–R3, R6 is_critical, R7 completed_at)
-- ---------------------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  title text not null check (char_length(btrim(title)) between 1 and 200),
  description text check (char_length(description) <= 2000),
  due_at timestamptz not null,
  manual_status text check (manual_status in ('completed', 'canceled')),
  is_critical boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_user_id_due_at_idx on public.tasks (user_id, due_at);
create index tasks_category_id_idx on public.tasks (category_id);

-- updated_at la fiecare scriere; completed_at = momentul în care activitatea a devenit Completed
create function public.tasks_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();

  if new.manual_status = 'completed' then
    if tg_op = 'INSERT' or old.manual_status is distinct from 'completed' then
      new.completed_at := now();
    else
      new.completed_at := old.completed_at;
    end if;
  else
    new.completed_at := null;
  end if;

  return new;
end;
$$;

create trigger tasks_before_write
  before insert or update on public.tasks
  for each row execute function public.tasks_before_write();

-- ---------------------------------------------------------------------------
-- Drepturi: doar utilizatorii autentificați; fără acces anonim
-- ---------------------------------------------------------------------------
revoke all on public.categories, public.tasks from anon, authenticated;
grant select, insert, update, delete on public.categories, public.tasks to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security: fiecare utilizator vede și modifică doar datele lui
-- ---------------------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.tasks enable row level security;

create policy "categories: read built-in and own"
  on public.categories for select to authenticated
  using (user_id is null or user_id = (select auth.uid()));

create policy "categories: insert own"
  on public.categories for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "categories: update own"
  on public.categories for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "categories: delete own"
  on public.categories for delete to authenticated
  using (user_id = (select auth.uid()));

create policy "tasks: read own"
  on public.tasks for select to authenticated
  using (user_id = (select auth.uid()));

-- La scriere se verifică și că și categoria aleasă e vizibilă utilizatorului
-- (cheile străine ignoră RLS, deci fără verificare s-ar putea folosi categoria altcuiva).
create policy "tasks: insert own"
  on public.tasks for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and (
      tasks.category_id is null
      or exists (
        select 1 from public.categories c
        where c.id = tasks.category_id
          and (c.user_id is null or c.user_id = (select auth.uid()))
      )
    )
  );

create policy "tasks: update own"
  on public.tasks for update to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and (
      tasks.category_id is null
      or exists (
        select 1 from public.categories c
        where c.id = tasks.category_id
          and (c.user_id is null or c.user_id = (select auth.uid()))
      )
    )
  );

create policy "tasks: delete own"
  on public.tasks for delete to authenticated
  using (user_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- Realtime (R5): modificările de pe web apar pe mobil și invers
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.tasks;
