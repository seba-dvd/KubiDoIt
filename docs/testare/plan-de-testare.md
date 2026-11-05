# Plan de testare R1–R3

Responsabil: Nicolescu Andreas. Fiecare caz are un ID. Testele automate din `shared/src/*.test.ts` (M2.7, #55) poartă același ID în numele lor, de exemplu `it("TC-R3-04: ...")`.

## Domeniu și strategie

| Nivel            | Unealtă           | Ce acoperă                                             | Issue |
| ---------------- | ----------------- | ------------------------------------------------------ | ----- |
| Unitar           | Vitest            | `computeStatus()`, validare, reducerul de activități   | #55   |
| End-to-end (web) | Playwright        | adăugare, statusuri, ștergere, filtre (mod demo)       | #56   |
| Manual           | web, Android, iOS | tot ce nu se automatizează: aspect, selectorul de dată | #22   |

Obiectiv măsurabil: **O3**, cele 4 statusuri corecte în 100% din cazurile de status.

## Mediu de testare

| Platformă | Cum se rulează                       |
| --------- | ------------------------------------ |
| Web       | `npm run dev:web`, Chrome și Firefox |
| Android   | `npm run dev:mobile`, Expo Go        |
| iOS       | `npm run dev:mobile`, Expo Go        |

Date: mod demo (fără `.env`) pentru R1–R3; cont de test Supabase pentru verificarea persistenței.

## R1 – Adăugare

| ID       | Caz                       | Date de intrare                  | Rezultat așteptat                            | Auto |
| -------- | ------------------------- | -------------------------------- | -------------------------------------------- | ---- |
| TC-R1-01 | Activitate validă         | titlu „Test”, termen în viitor   | apare în listă, status Urmează               | da   |
| TC-R1-02 | Titlu gol                 | titlu ``                         | eroare la titlu, nu se salvează              | da   |
| TC-R1-03 | Titlu doar din spații     | titlu `   `                      | eroare la titlu, nu se salvează              | da   |
| TC-R1-04 | Titlu la limită           | 200 de caractere                 | se salvează                                  | da   |
| TC-R1-05 | Titlu peste limită        | 201 caractere                    | eroare, nu se salvează                       | da   |
| TC-R1-06 | Titlu cu spații la capete | `  Test  `                       | se salvează ca „Test”                        | da   |
| TC-R1-07 | Descriere la limită       | 2000 de caractere                | se salvează                                  | da   |
| TC-R1-08 | Descriere peste limită    | 2001 de caractere                | eroare, nu se salvează                       | da   |
| TC-R1-09 | Termen lipsă              | fără dată / oră                  | eroare la termen, nu se salvează             | da   |
| TC-R1-10 | Termen în trecut          | termen cu o oră în urmă          | se salvează, status Restant                  | da   |
| TC-R1-11 | Selectorul de dată / oră  | alegere pe Android și iOS        | data și ora alese apar corect în listă       | nu   |
| TC-R1-12 | Formular accesibil        | navigare doar cu tastatura (web) | toate câmpurile sunt accesibile, etichete ok | nu   |

## R2 – Eliminare

| ID       | Caz                                  | Pași                               | Rezultat așteptat                           | Auto |
| -------- | ------------------------------------ | ---------------------------------- | ------------------------------------------- | ---- |
| TC-R2-01 | Ștergere confirmată                  | Șterge → Confirmă                  | activitatea dispare                         | da   |
| TC-R2-02 | Ștergere anulată (M2.9)              | Șterge → Anulează                  | activitatea rămâne                          | da   |
| TC-R2-03 | Ștergerea ultimei activități         | șterge singura activitate          | apare starea goală                          | da   |
| TC-R2-04 | Dialog accesibil (web)               | Escape, focus în dialog            | Escape = Anulează; focusul rămâne în dialog | nu   |
| TC-R2-05 | Dialog pe mobil                      | `Dialog` din Paper, Android și iOS | același comportament ca pe web              | nu   |
| TC-R2-06 | Persistență după ștergere (Supabase) | șterge, reîncarcă pagina           | activitatea nu reapare                      | nu   |

## R3 – Statusuri (matricea completă)

Regula: `manual_status` are prioritate; altfel `now > due_at` → Restant, `now ≤ due_at` → Urmează. La **exact** termenul activitatea e încă **Urmează**.

| ID       | `manual_status` | `now` față de `due_at` | Status așteptat | Auto |
| -------- | --------------- | ---------------------- | --------------- | ---- |
| TC-R3-01 | nul             | înainte de termen      | Urmează         | da   |
| TC-R3-02 | nul             | după termen            | Restant         | da   |
| TC-R3-03 | nul             | exact la termen        | Urmează         | da   |
| TC-R3-04 | nul             | cu 1 ms după termen    | Restant         | da   |
| TC-R3-05 | `completed`     | înainte de termen      | Complet         | da   |
| TC-R3-06 | `completed`     | după termen            | Complet         | da   |
| TC-R3-07 | `canceled`      | înainte de termen      | Anulat          | da   |
| TC-R3-08 | `canceled`      | după termen            | Anulat          | da   |

Tranziții și comportament în aplicație:

| ID       | Caz                                   | Pași                                         | Rezultat așteptat                                   | Auto |
| -------- | ------------------------------------- | -------------------------------------------- | --------------------------------------------------- | ---- |
| TC-R3-09 | Marcare Complet                       | apasă „Complet” pe o activitate Urmează      | status Complet; `completed_at` completat            | da   |
| TC-R3-10 | Marcare Anulat                        | apasă „Anulat”                               | status Anulat                                       | da   |
| TC-R3-11 | Reactivare din Complet, termen viitor | apasă „Reactivează”                          | status Urmează; `completed_at` nul                  | da   |
| TC-R3-12 | Reactivare din Anulat, termen trecut  | apasă „Reactivează”                          | status Restant                                      | da   |
| TC-R3-13 | Trecerea timpului                     | activitate cu termen peste 1 minut; așteaptă | devine Restant fără reîncărcare (în ~30 s)          | da   |
| TC-R3-14 | Culori după status                    | vezi lista cu cele 4 statusuri               | fiecare status are culoarea și eticheta lui         | nu   |
| TC-R3-15 | Restant / Urmează nu se salvează      | verifică rândul în baza de date              | doar `manual_status` e salvat, nu statusul calculat | nu   |

## Securitate (R5, verificat la M3.10)

| ID        | Caz                                       | Rezultat așteptat   |
| --------- | ----------------------------------------- | ------------------- |
| TC-SEC-01 | Utilizatorul B citește activitățile lui A | 0 rânduri           |
| TC-SEC-02 | B modifică / șterge o activitate a lui A  | 0 rânduri atinse    |
| TC-SEC-03 | Cerere fără autentificare (`anon`)        | `permission denied` |

Acoperite deja de `supabase/tests/rls_tasks.sql` (rulat la 03.11.2026, vezi [schema-bd.md](../schema-bd.md)).

## Execuția manuală

Pentru fiecare caz marcat „nu” în coloana Auto, se completează tabelul de mai jos la fiecare rundă.

| ID       | Web | Android | iOS | Data | Tester | Observații |
| -------- | --- | ------- | --- | ---- | ------ | ---------- |
| TC-R1-11 |     |         |     |      |        |            |
| TC-R1-12 |     |         |     |      |        |            |
| TC-R2-04 |     |         |     |      |        |            |
| TC-R2-05 |     |         |     |      |        |            |
| TC-R2-06 |     |         |     |      |        |            |
| TC-R3-14 |     |         |     |      |        |            |
| TC-R3-15 |     |         |     |      |        |            |

Legendă: ✅ trecut, ❌ picat (se deschide issue cu template-ul _Raport de eroare_), – nu se aplică.

## Criterii de acceptare

- Toate cazurile TC-R3-01…08 trec în teste automate (O3).
- Fiecare caz „da” din coloana Auto are un test cu același ID.
- Zero erori critice (crash, pierdere de date) la runda manuală (O7).
