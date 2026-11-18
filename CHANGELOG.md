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

## [1.6.0] – 2026-11-19

### Adăugat

- `shared/`: API pentru categorii (`listCategories`, `createCategory`, `deleteCategory`) și funcțiile pure `filterByCategory` și `groupByCategory` pentru filtrarea și gruparea activităților pe categorii (R4), cu teste (#76).
- Web: pagina de activități după wireframe-uri: aspect responsive, cu meniul strâns pe telefon, stări goale și formular accesibil (câmpuri obligatorii, focus pe primul câmp invalid) (#75).
- Mobil: stări goale în lista de activități, iconița și ecranul de pornire (splash) KubiDoIt (#74).
- Testul RLS acoperă și categoriile: proprietarul își poate redenumi categoria, iar alt utilizator nu o poate modifica, șterge sau crea pe numele lui (#77).

### Corectat

- Supabase: migrația `20261119120000_revoke_rls_auto_enable` scoate dreptul de execuție pe `public.rls_auto_enable()` pentru `anon` și `authenticated` (avertisment din Security Advisor, #77).
- Mobil: marginea de sus a ecranului de adăugare a unei activități (#74).

### Documentație

- `schema-bd.md` și `arhitectura.md` verificate cu baza reală; rezultatele Security și Performance Advisor și lista migrațiilor aplicate (#77, #78).
- Aplicația web e publicată pe Vercel, la https://kubi-do-it.vercel.app, deocamdată în mod demo.
- Release-urile de pe GitHub includ lista PR-urilor și link-ul spre diff-ul de cod față de versiunea anterioară.

## [1.5.2] – 2026-11-09

### Documentație

- Review-ul PR-urilor e la cerere: autorul își îmbină singur PR-ul după ce CI-ul `verify` e verde și îl adaugă pe David (PM) ca revizor doar când vrea o a doua părere. Ghidurile, planul, README-ul și `CLAUDE.md` spun la fel.
- Cazurile de utilizare se numesc acum `docs/user-cases.md` (înainte `docs/cazuri-de-utilizare.md`).
- `user-stories.md`: antetul trece doar responsabilul; PDF-ul de specificații e regenerat.

## [1.5.1] – 2026-11-07

### Documentație

- User stories R1–R8 (`docs/user-stories.md`): 25 de user stories cu criterii de acceptare, fiecare legat de cazul de utilizare și de cazurile de test existente (#70).
- Documentul de specificații tehnice în PDF (`docs/livrabile/KubiDoIt_Specificatii_Tehnice.pdf`): arhitectura, schema bazei de date, wireframe-urile web și mobile, cazurile de utilizare, user stories și planul de testare.
- PDF-ul charter-ului regenerat din versiunea 1.1 (`docs/project-charter/Project_Charter_KubiDoIt.pdf`).
- `arhitectura.md`: Expo SDK 58 în locul lui 57 și regula versiunii comune de React.
- Planul, ghidurile din `docs/echipa/` și lista pachetului L1 actualizate pentru user stories și documentul de specificații.

## [1.5.0] – 2026-11-05

### Adăugat

- `shared/`: `getCompletedTodayCount()`, `getCompletedThisWeekCount()` și `getReminderTime()` pentru statistici (R7) și remindere (R6), cu teste.
- `supabase/tests/rls_tasks.sql`: testul RLS cu doi utilizatori, care se verifică singur și face `rollback` la final.

### Corectat

- Mobil: pachetele duplicate rămase după upgrade-ul de la SDK 57 și erorile de typecheck și ESLint din ecranele Statistici și din selectorul de dată.

### Documentație

- Rolurile din echipă corectate după cum s-a lucrat de fapt (charter v1.1): Pilat David apare ca Project Manager, rol pe care l-a avut de la începutul proiectului, și rămâne dezvoltator backend; Nicolescu Andreas apare ca QA Lead și analist de cerințe. Actualizate charter-ul, planul, ghidurile din `docs/echipa/`, lista pachetului L1, README-ul și `CLAUDE.md`. Sarcină nouă: M1.11, user stories (#70).
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
5. După ce PR-ul ajunge în `main`, creează tag-ul și Release-ul pe commit-ul de merge din `main`:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin vX.Y.Z
   ```

   ```bash
   gh release create vX.Y.Z --verify-tag --title "vX.Y.Z" --notes-file <secțiunea-din-CHANGELOG>.md --generate-notes --notes-start-tag vA.B.C
   ```

   `vA.B.C` este versiunea anterioară. Pe lângă secțiunea din CHANGELOG, Release-ul primește automat lista PR-urilor incluse (cu link spre fiecare) și link-ul „Full Changelog” spre diff-ul de cod față de versiunea anterioară. Arhivele „Source code (zip / tar.gz)” le adaugă GitHub singur și nu pot fi scoase.

[1.6.0]: https://github.com/seba-dvd/KubiDoIt/compare/v1.5.2...v1.6.0
[1.5.2]: https://github.com/seba-dvd/KubiDoIt/compare/v1.5.1...v1.5.2
[1.5.1]: https://github.com/seba-dvd/KubiDoIt/compare/v1.5.0...v1.5.1
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
