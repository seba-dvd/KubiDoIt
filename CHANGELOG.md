# Istoricul versiunilor

Toate modificările importante ale proiectului KubiDoIt sunt notate aici. Formatul urmează [Keep a Changelog](https://keepachangelog.com/ro/1.1.0/), iar versiunile respectă [Semantic Versioning](https://semver.org/lang/ro/).

## Reguli de versionare

Versiunea are forma **MAJOR.MINOR.PATCH** și se alege după tipul commit-urilor ([Conventional Commits](https://www.conventionalcommits.org/)) incluse de la versiunea anterioară:

| Se schimbă | Când                                                                                                                    | Commit-uri                                       | Exemplu       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| **MAJOR**  | o schimbare incompatibilă: date vechi care nu mai merg, API din `shared/` schimbat, migrație care rupe compatibilitatea | `feat!:`, `fix!:` sau `BREAKING CHANGE:` în corp | 1.4.2 → 2.0.0 |
| **MINOR**  | o funcționalitate nouă, compatibilă cu ce exista                                                                        | `feat:`                                          | 1.3.4 → 1.4.0 |
| **PATCH**  | corecturi și orice altceva care nu adaugă funcționalități                                                               | `fix:`, `refactor:`, `docs:`, `chore:`, `test:`  | 1.4.0 → 1.4.1 |

- Versiunea e aceeași pentru tot monorepo-ul: `package.json` din rădăcină, `shared/`, `web/`, `mobile/` și `mobile/app.json`.
- Fiecare versiune are un tag Git `vX.Y.Z` și o pagină de [Release pe GitHub](https://github.com/seba-dvd/KubiDoIt/releases).
- Pașii pentru o versiune nouă sunt în secțiunea [Cum se publică o versiune](#cum-se-publică-o-versiune).

## [1.5.0] – 2026-11-05

### Adăugat

- `shared/`: `getCompletedTodayCount()`, `getCompletedThisWeekCount()` și `getReminderTime()` pentru statistici (R7) și remindere (R6), cu teste.
- `supabase/tests/rls_tasks.sql`: testul RLS cu doi utilizatori, care se verifică singur și face `rollback` la final.

### Corectat

- Mobil: pachetele duplicate rămase după upgrade-ul de la SDK 57 și erorile de typecheck și ESLint din ecranele Statistici și din selectorul de dată.

### Documentație

- Roluri noi în echipă (charter v1.1): Pilat David devine Project Manager și rămâne dezvoltator backend; Nicolescu Andreas devine QA Lead și analist de cerințe. Actualizate charter-ul, planul, ghidurile din `docs/echipa/`, lista pachetului L1, README-ul și `CLAUDE.md`. Sarcină nouă: M1.11, user stories (#70).
- Cazurile de utilizare R1–R8 cu diagrama (`docs/cazuri-de-utilizare.md`), planul de testare (`docs/testare/plan-de-testare.md`) și lista pachetului L1 (`docs/pachet-L1.md`).
- Wireframe-urile aplicației mobile în `docs/wireframes/mobile/`.
- `schema-bd.md` descrie testul RLS și rezultatele lui; comenzile Supabase CLI folosesc `--remote`.

### Altele

- Mobil: upgrade la Expo SDK 58 (React Native 0.88, React 19.3.0).

## [1.4.0] – 2026-11-03

### Adăugat

- `shared/`: tipurile generate din baza Supabase (`database.types.ts`).
- `shared/`: stratul de date pentru activități (`listTasks`, `createTask`, `deleteTask`, `setTaskStatus`), cu clientul Supabase primit ca parametru, plus teste cu un client simulat.

### Documentație

- Ghiduri pentru fiecare membru în `docs/echipa/` și calendarul din charter.
- Sarcini de cod pentru Andreas (teste automate, confirmarea ștergerii).

## [1.3.4] – 2026-10-14

### Corectat

- Mobil: cardurile activităților folosesc stilul _contained_, ca marginea colorată a statusului să nu mai apară dublată de contur.

### Altele

- Versiunea `1.3.4` setată în toate pachetele; adăugat acest fișier.
- `mobile/.gitignore` generat de `expo start` este acum urmărit în Git.

## [1.3.3] – 2026-10-14

### Corectat

- Web: după adăugarea unei activități, termenul revine la valoarea implicită (mâine, ora 12:00), ca pe mobil.

## [1.3.2] – 2026-10-14

### Documentație

- `CLAUDE.md` și `docs/plan-proiect.md` notează că MVP-ul rulează și că ramura `main` este protejată.

## [1.3.1] – 2026-10-14

### Altele

- CI: `actions/checkout` și `actions/setup-node` actualizate la v7 (versiunile v4 foloseau Node 20, depreciat).

## [1.3.0] – 2026-10-14

### Adăugat

- Mobil (R1–R3): tab-ul Activități cu filtre pe status, carduri, butoanele Complet / Anulează / Reactivează / Șterge și butonul „Adaugă”.
- Mobil: ecranul modal de adăugare, cu validare și selector nativ de dată / oră.
- Mobil: tab-ul Statistici cu numărul pe status și rata de finalizare.
- Pachetele Expo SDK 57 aduse la ultimele versiuni patch (`expo-doctor`: 21/21).

## [1.2.1] – 2026-10-14

### Modificat

- Funcțiile pentru termenul implicit și pentru câmpul `datetime-local` mutate din `web/` în `shared/`, ca să le folosească și aplicația mobilă.

## [1.2.0] – 2026-10-14

### Adăugat

- Web (R1–R3): formular de adăugare cu validare, filtre pe status cu numărători, listă sortată, butoanele Complet / Anulează / Reactivează / Șterge.
- Web: statusurile se recalculează la 30 de secunde, deci o activitate devine „Restant” fără reîncărcarea paginii.
- Web: pagina Statistici cu numărul pe status și rata de finalizare.

## [1.1.0] – 2026-10-14

### Adăugat

- `shared/`: `tasksReducer` (adăugare, ștergere, schimbare status), `validateNewTask`, `countByStatus`, `completionRate`, `sortTasksForDisplay`.
- `shared/`: date mock cu termene relative la momentul curent, ca cele 4 statusuri să apară mereu.
- `shared/`: identificatori locali pentru modul demo.

## [1.0.0] – 2026-10-14

### Adăugat

- Monorepo cu npm workspaces: `shared/`, `web/` (React 19, Vite, React Router 7), `mobile/` (Expo SDK 57, Expo Router, React Native Paper).
- `shared/`: tipuri, `computeStatus()` cu teste, etichete și culori pentru cele 4 statusuri.
- Supabase: `config.toml` și migrația inițială (categorii, activități, Row Level Security, Realtime).
- Unelte: ESLint, Prettier, Vitest, TypeScript 6, CI pe GitHub Actions, template-uri pentru PR-uri și issue-uri.
- Documentație: project charter (PDF și Markdown), arhitectură, schema bazei de date, planul proiectului.

## Cum se publică o versiune

1. Alege numărul nou după tabelul de mai sus, pe baza commit-urilor de la ultimul tag (`git log vX.Y.Z..HEAD --oneline`).
2. Adaugă secțiunea versiunii în acest fișier, deasupra celei anterioare.
3. Setează versiunea în toate pachetele, din rădăcină:

   ```bash
   npm version X.Y.Z --workspaces --include-workspace-root --no-git-tag-version
   ```

   apoi actualizează manual `expo.version` din `mobile/app.json`.

4. Commit `chore(release): vX.Y.Z`, prin Pull Request ca orice altă modificare.
5. După ce PR-ul ajunge în `main`, creează tag-ul și Release-ul pe commit-ul din `main`:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin vX.Y.Z
   ```

   ```bash
   gh release create vX.Y.Z --verify-tag --title "vX.Y.Z" --notes "<secțiunea din CHANGELOG>"
   ```

[1.5.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.3.4...v1.4.0
[1.3.4]: https://github.com/seba-dvd/KubiDoIt/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/seba-dvd/KubiDoIt/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/seba-dvd/KubiDoIt/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/seba-dvd/KubiDoIt/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/seba-dvd/KubiDoIt/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/seba-dvd/KubiDoIt/releases/tag/v1.0.0
