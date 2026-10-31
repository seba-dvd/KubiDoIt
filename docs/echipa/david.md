# Ghid pentru David – dezvoltator backend

Ce ai de făcut în KubiDoIt, în ordine și cu termene. Pe GitHub, toate sarcinile tale sunt adunate în [#5 Sarcinile lui David (backend)][#5]. Fiecare sarcină are issue-ul ei, cu pașii concreți și criteriile „gata când”. Planul întregii echipe e în [plan-proiect.md](../plan-proiect.md).

## Rolul tău

Răspunzi de backend și de codul comun:

- `supabase/`: migrațiile, Auth, Row Level Security, Realtime;
- `shared/`: tipurile generate, stratul de date `shared/src/api/` și sincronizarea, folosite de ambele aplicații;
- securitatea: cheile, politicile RLS, Security Advisor;
- administrarea repository-ului (ești proprietarul lui).

Aproape toate sarcinile lui Tudor și Andrei care folosesc date reale așteaptă după tine. De aceea **proiectul Supabase ([#6]) e primul lucru de făcut**.

## Pornire (o singură dată)

Proiectul rulează deja la tine. Ramura ta este **`feature/david-backend`**, creată din issue-ul [#15] (o vezi la _Development_):

```bash
git fetch origin
git switch feature/david-backend
git merge origin/main   # înainte de fiecare sarcină nouă
```

[#15] se închide automat când PR #1 intră în `main`.

## Fluxul de lucru

1. Lucrezi pe ramura ta. Commit-urile sunt în engleză, după [Conventional Commits](https://www.conventionalcommits.org/): `feat(shared): add tasks api`, `feat(supabase): add groups migration`, `test(supabase): add RLS test`.
2. Înainte de PR rulezi `npm run lint && npm run format:check && npm run typecheck && npm test`.
3. PR din `feature/david-backend` în `main`, cu `Closes #<issue>` în descriere, review de la un coleg, CI `verify` verde, _Create a merge commit_. Nu șterge ramura după merge.
4. Ești admin pe repository, deci regula de protecție nu te oprește tehnic. Nu o ocoli: fiecare PR al tău are nevoie de aprobarea unui coleg, ca la toți ceilalți.

## Ce faci acum

1. **[PR #1](https://github.com/seba-dvd/KubiDoIt/pull/1) (MVP)**: cere review explicit (Tudor pentru web, Andrei pentru mobil, Andreas testează), rezolvă comentariile și fă merge. PR-ul închide [#17] și [#15].
2. [#6] **M1.3 – proiectul Supabase** (Free, Frankfurt). Aplică migrația, rulează testul RLS și trimite echipei URL-ul și cheia anon pe privat. Termenul L1 (22.10) a trecut, iar sarcina blochează [#7], [#20], [#21] și [#23].
3. [#7] **M1.4 – revizuirea documentației**, împreună cu Andreas.
4. Spre checkpoint-ul web din **05.11**: întâi [#23] (Tudor are nevoie de el pentru login), apoi [#20] (pentru [#25]), apoi [#21].

## Calendarul tău

| Termen            | Issue | Sarcina                                                         | Așteaptă după        |
| ----------------- | ----- | --------------------------------------------------------------- | -------------------- |
| **22.10** · L1    | [#6]  | M1.3 Proiectul Supabase + migrația inițială                     | –                    |
|                   | [#7]  | M1.4 Revizuirea `schema-bd.md` și `arhitectura.md` (cu Andreas) | [#6]                 |
|                   | [#15] | M1.9 Pornire + primul PR (PR #1)                                | –                    |
| **05.11** · web   | [#17] | M2.1 MVP R1–R3 (PR #1)                                          | review               |
|                   | [#23] | M3.1 Setările Auth                                              | [#6]                 |
|                   | [#20] | M2.4 Tipurile generate + `shared/src/api/`                      | [#6]                 |
|                   | [#21] | M2.5 Test RLS cu două conturi                                   | [#6]                 |
| **19.11** · L2    | [#29] | M3.7 API pentru categorii + filtrare și grupare                 | [#20]                |
|                   | [#38] | M4.6 Security / Performance Advisor, RLS pentru categorii       | [#29]                |
|                   | [#45] | M6.1 Publicarea pe Vercel (ajuți pe Tudor)                      | [#24] (Tudor)        |
| **03.12** · mobil | [#28] | M3.6 Sincronizare Realtime (`subscribeToTasks()`)               | [#25], [#27]         |
| **17.12** · L3    | [#40] | M5.1 Migrația 2 pentru grupuri (R8, opțional)                   | [#28]                |
|                   | [#41] | M5.2 API pentru grupuri (R8, opțional)                          | [#40]                |
|                   | [#51] | M6.5 Documentația backend finală                                | [#40], dacă R8 intră |

## Depinzi de / depind de tine

- **Te așteaptă Tudor:** [#24] are nevoie de [#23], [#25] de [#20], iar [#30] de [#29].
- **Te așteaptă Andrei:** [#26] are nevoie de [#23], [#27] de [#20], iar [#31] de [#29].
- **Te așteaptă Andreas:** testarea izolării datelor ([#32]) și pachetul L1 ([#16]), pentru care coordonatorul are nevoie de acces la repository-ul privat.
- **Aștepți tu:** integrarea Realtime ([#28]) se face după ce web ([#25]) și mobil ([#27]) citesc din Supabase. Publicarea pe Vercel ([#45]) vine de la Tudor, iar tu adaugi URL-ul în Supabase Auth.

## Reguli pentru zona ta

- Cheia **`service_role` / secret** nu apare în niciun fișier din repository, în niciun issue și în niciun mesaj. În aplicații intră doar cheia anon / publishable. Datele sunt protejate de RLS.
- Migrațiile se aplică **în ordinea numelor**. O migrație deja aplicată nu se mai modifică: orice schimbare înseamnă un fișier nou în `supabase/migrations/`, cu timestamp mai mare.
- RLS e activat pe toate tabelele. Politicile folosesc `(select auth.uid())`. Rolul `anon` nu are drepturi pe tabele.
- După fiecare migrație regenerezi tipurile (`npx supabase gen types typescript --project-id <id> > shared/src/database.types.ts`) și rulezi testul RLS din `supabase/tests/`.
- `shared/` rămâne TypeScript pur, fără React și fără API-uri DOM / React Native. Funcțiile din `shared/src/api/` primesc clientul Supabase ca parametru și au teste Vitest cu client simulat.
- Logica nouă comună ambelor aplicații intră în `shared/`, nu în `web/` sau `mobile/`.

## Definition of Done

Valabilă pentru orice sarcină: vezi [plan-proiect.md → Definition of Done](../plan-proiect.md#definition-of-done-pentru-orice-sarcină).

[#5]: https://github.com/seba-dvd/KubiDoIt/issues/5
[#6]: https://github.com/seba-dvd/KubiDoIt/issues/6
[#7]: https://github.com/seba-dvd/KubiDoIt/issues/7
[#15]: https://github.com/seba-dvd/KubiDoIt/issues/15
[#16]: https://github.com/seba-dvd/KubiDoIt/issues/16
[#17]: https://github.com/seba-dvd/KubiDoIt/issues/17
[#20]: https://github.com/seba-dvd/KubiDoIt/issues/20
[#21]: https://github.com/seba-dvd/KubiDoIt/issues/21
[#23]: https://github.com/seba-dvd/KubiDoIt/issues/23
[#24]: https://github.com/seba-dvd/KubiDoIt/issues/24
[#25]: https://github.com/seba-dvd/KubiDoIt/issues/25
[#26]: https://github.com/seba-dvd/KubiDoIt/issues/26
[#27]: https://github.com/seba-dvd/KubiDoIt/issues/27
[#28]: https://github.com/seba-dvd/KubiDoIt/issues/28
[#29]: https://github.com/seba-dvd/KubiDoIt/issues/29
[#30]: https://github.com/seba-dvd/KubiDoIt/issues/30
[#31]: https://github.com/seba-dvd/KubiDoIt/issues/31
[#32]: https://github.com/seba-dvd/KubiDoIt/issues/32
[#38]: https://github.com/seba-dvd/KubiDoIt/issues/38
[#40]: https://github.com/seba-dvd/KubiDoIt/issues/40
[#41]: https://github.com/seba-dvd/KubiDoIt/issues/41
[#45]: https://github.com/seba-dvd/KubiDoIt/issues/45
[#51]: https://github.com/seba-dvd/KubiDoIt/issues/51
