# Schema bazei de date

Document de specificații pentru livrabilul L1. Responsabil: Pilat David.
Sursa de adevăr este migrația [`supabase/migrations/20261014120000_init_schema.sql`](../supabase/migrations/20261014120000_init_schema.sql); documentul o explică.

## Diagrama entitate–relație

```mermaid
erDiagram
  AUTH_USERS ||--o{ TASKS : "deține"
  AUTH_USERS ||--o{ CATEGORIES : "creează (personalizate)"
  CATEGORIES |o--o{ TASKS : "clasifică"

  AUTH_USERS {
    uuid id PK
    text email
  }
  CATEGORIES {
    uuid id PK
    uuid user_id FK "NULL = predefinită"
    text name "1–40 caractere"
    text color "#RRGGBB"
    timestamptz created_at
  }
  TASKS {
    uuid id PK
    uuid user_id FK "implicit auth.uid()"
    uuid category_id FK "opțional"
    text title "1–200 caractere"
    text description "opțional, max. 2000"
    timestamptz due_at "termenul"
    text manual_status "NULL, completed, canceled"
    boolean is_critical "R6"
    timestamptz completed_at "R7, setat de trigger"
    timestamptz created_at
    timestamptz updated_at "setat de trigger"
  }
```

`auth.users` este tabelul gestionat de Supabase Auth.

## Tabele

### `public.categories` (R4)

| Coloană      | Tip           | Reguli                                                                      |
| ------------ | ------------- | --------------------------------------------------------------------------- |
| `id`         | `uuid`        | cheie primară, `gen_random_uuid()`                                          |
| `user_id`    | `uuid`        | `NULL` = categorie predefinită; altfel proprietarul (implicit `auth.uid()`) |
| `name`       | `text`        | 1–40 caractere, unic per utilizator (`unique nulls not distinct`)           |
| `color`      | `text`        | opțional, format `#RRGGBB`                                                  |
| `created_at` | `timestamptz` | `now()`                                                                     |

Categoriile predefinite sunt create de migrație, cu ID-uri fixe: **Muncă** (`…0001`), **Școală** (`…0002`), **Sală** (`…0003`).

### `public.tasks` (R1–R3, R6, R7)

| Coloană         | Tip           | Reguli                                                                     |
| --------------- | ------------- | -------------------------------------------------------------------------- |
| `id`            | `uuid`        | cheie primară                                                              |
| `user_id`       | `uuid`        | obligatoriu, implicit `auth.uid()`; ștergerea contului șterge activitățile |
| `category_id`   | `uuid`        | opțional; ștergerea categoriei lasă activitatea fără categorie             |
| `title`         | `text`        | 1–200 caractere (fără spațiile de la capete)                               |
| `description`   | `text`        | opțional, max. 2000 caractere                                              |
| `due_at`        | `timestamptz` | obligatoriu; termenul folosit de `computeStatus()`                         |
| `manual_status` | `text`        | `NULL`, `'completed'` sau `'canceled'`                                     |
| `is_critical`   | `boolean`     | activitate „Critic”, primește reminder (R6)                                |
| `completed_at`  | `timestamptz` | momentul finalizării, pentru statistici pe zi / săptămână (R7)             |
| `created_at`    | `timestamptz` | `now()`                                                                    |
| `updated_at`    | `timestamptz` | actualizat automat                                                         |

Indecși: `(user_id, due_at)` pentru lista sortată după termen, `category_id` pentru filtrare.

**De ce nu există coloana `status`:** Restant / Urmează depind de ora curentă, deci o valoare salvată ar deveni greșită fără nicio scriere. Se salvează doar statusul manual; statusul afișat îl calculează `computeStatus()` din `@kubidoit/shared`.

## Trigger `tasks_before_write`

Rulează înainte de fiecare `INSERT` / `UPDATE` pe `tasks`:

- `updated_at` primește `now()`;
- dacă `manual_status` devine `completed`, `completed_at` primește `now()` (se păstrează la actualizările ulterioare);
- dacă activitatea nu mai e `completed` (anulată sau reactivată), `completed_at` devine `NULL`.

Funcția are `search_path` gol, ca să nu poată fi păcălită cu obiecte din alte scheme.

## Securitate: drepturi și Row Level Security

- Rolul `anon` nu are niciun drept pe tabele. Rolul `authenticated` are doar `SELECT`, `INSERT`, `UPDATE` și `DELETE`.
- RLS este activat pe ambele tabele. Politicile folosesc `(select auth.uid())`, varianta recomandată de Supabase pentru performanță.

| Tabel        | Operație                 | Cine are voie                                                                                 |
| ------------ | ------------------------ | --------------------------------------------------------------------------------------------- |
| `categories` | SELECT                   | categoriile predefinite + ale utilizatorului                                                  |
| `categories` | INSERT / UPDATE / DELETE | doar ale utilizatorului (cele predefinite nu pot fi modificate)                               |
| `tasks`      | SELECT / DELETE          | doar activitățile proprii                                                                     |
| `tasks`      | INSERT / UPDATE          | doar activități proprii, iar `category_id` trebuie să fie o categorie vizibilă utilizatorului |

Verificarea categoriei este necesară pentru că cheile străine ignoră RLS: fără ea, cineva ar putea lega o activitate de categoria personală a altui utilizator.

## Realtime (R5)

Tabelul `tasks` este adăugat în publicația `supabase_realtime`. Clienții se abonează la `postgres_changes`, iar RLS se aplică și evenimentelor: fiecare utilizator primește doar modificările activităților lui. La `DELETE`, Supabase trimite doar cheia primară (rândul nu mai există), deci clientul elimină activitatea după `id` sau reîncarcă lista.

## Aplicarea migrației

În ordinea numelor fișierelor, prin una dintre metode:

- **SQL Editor:** _SQL Editor → New query_, lipești conținutul fișierului, _Run_;
- **Supabase CLI:** `npx supabase login`, `npx supabase link --project-ref <id-proiect>`, `npx supabase db push`.

După aplicare, tipurile TypeScript se pot genera cu:

```bash
npx supabase gen types typescript --project-id <id-proiect> > shared/src/database.types.ts
```

## Test rapid pentru RLS

1. În _Authentication → Users → Add user_, creează doi utilizatori de test, A și B, și notează-le ID-urile.
2. În SQL Editor rulează (înlocuiește ID-urile; `rollback` anulează totul la final):

```sql
begin;

-- Acționăm ca utilizatorul A
select set_config('request.jwt.claims', '{"sub":"<ID-A>","role":"authenticated"}', true);
set local role authenticated;

insert into public.tasks (title, due_at) values ('Activitatea lui A', now() + interval '1 day');
select count(*) as vizibile_pentru_A from public.tasks;            -- 1

-- Acționăm ca utilizatorul B
reset role;
select set_config('request.jwt.claims', '{"sub":"<ID-B>","role":"authenticated"}', true);
set local role authenticated;

select count(*) as vizibile_pentru_B from public.tasks;            -- 0
update public.tasks set title = 'modificat de B';                 -- UPDATE 0
delete from public.tasks;                                           -- DELETE 0
select count(*) as categorii_vazute_de_B from public.categories;   -- 3 (doar cele predefinite)

rollback;
```

3. Ca `anon` nu se poate citi nimic:

```sql
begin;
set local role anon;
select * from public.tasks;   -- eroare: permission denied for table tasks
rollback;
```

## Extensia pentru grupuri (R8, migrația 2)

Planificată pentru M5, dacă R8 rămâne în scope:

- `profiles` (`id` = `auth.users.id`, `display_name`, `email`), completat de un trigger la crearea contului;
- `groups` (`id`, `name`, `owner_id`, `invite_code` unic);
- `group_members` (`group_id`, `user_id`, `role`: `owner` / `member`; cheie primară compusă);
- `tasks.group_id` (opțional): activitate personală sau de grup;
- funcția `is_group_member(group_id)` cu `security definer`, folosită în politici (evită recursivitatea RLS pe `group_members`);
- funcția RPC `join_group(invite_code)`, prin care un utilizator intră în grup cu codul de invitație;
- politicile pentru `tasks` se extind: o activitate e vizibilă dacă e proprie **sau** dacă `group_id` aparține unui grup din care utilizatorul face parte.
