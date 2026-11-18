# Planul proiectului și împărțirea sarcinilor

Documentul împarte toate sarcinile din [README](../README.md) și din [Project Charter](project-charter/Schita_ProjectCharter.md) pe milestone-uri și pe membri. Fiecare rând este un [issue pe GitHub](https://github.com/seba-dvd/KubiDoIt/issues), cu responsabil și termen, și un card în Trello. David (PM) ține documentul la zi.

Ghidul fiecărui membru, cu ordinea sarcinilor și link-urile spre issue-uri, e în [docs/echipa/](echipa/README.md).

## Calendar

Termenele vin din charter (ședințele cursului) și sunt [milestone-uri pe GitHub](https://github.com/seba-dvd/KubiDoIt/milestones). Charter-ul cere întâi aplicația web, apoi pe cea mobilă, așa că sarcinile mobile din M2–M4 au termen după L2.

| Termen     | Ședința | Ce se predă / se verifică                                                    | Sarcini                                                                               |
| ---------- | ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 22.10.2026 | 2       | **L1**: planificare și specificații                                          | M1.3–M1.10                                                                            |
| 05.11.2026 | 3       | punct de control: aplicația web cu R1–R3 și autentificare                    | M2.1, M2.2, M2.4–M2.9, M3.1–M3.3                                                      |
| 19.11.2026 | 4       | **L2**: aplicația web cu R1–R7, publicată pe Vercel, + documentație          | M1.11, M3.7, M3.8, M3.11, M4.1, M4.2, M4.4, M4.6, M4.8, M6.1, M6.4 (ghid web, README) |
| 03.12.2026 | 5       | punct de control: aplicația mobilă cu R1–R5, pe același backend              | M2.3, M3.4–M3.6, M3.9, M3.10                                                          |
| 17.12.2026 | 6       | **L3**: aplicația mobilă completă + documentație; testare finală, prezentare | M4.3, M4.5, M4.7, M5.1–M5.5 (opțional), M6.2–M6.7                                     |

## Echipa

| Cine              | Rol                                   | Responsabil de                                                                                              | În tabele |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------- |
| Nicolescu Andreas | QA Lead + analist de cerințe          | cerințe (cazuri de utilizare), testare automată și manuală, README                                          | Andreas   |
| Mituleci Tudor    | Dezvoltator web                       | `web/`                                                                                                      | Tudor     |
| Kubanda Andrei    | Dezvoltator mobil                     | `mobile/`                                                                                                   | Andrei    |
| Pilat David       | Project Manager + dezvoltator backend | planificare, Trello, livrabile, legătura cu coordonatorul; `supabase/`, `shared/`, securitate, sincronizare | David     |

## Milestone-uri

| Milestone | Conținut                                               | Cerințe | Termen                            |
| --------- | ------------------------------------------------------ | ------- | --------------------------------- |
| M1        | Setup și specificații de proiectare (livrabilul L1)    | –       | 22.10.2026                        |
| M2        | MVP: adăugare / ștergere activități + cele 4 statusuri | R1–R3   | web 05.11, mobil 03.12.2026       |
| M3        | Autentificare, sincronizare, categorii                 | R4, R5  | web 05.11–19.11, mobil 03.12.2026 |
| M4        | Remindere și statistici de eficiență                   | R6, R7  | web 19.11, mobil 17.12.2026       |
| M5        | Activități de grup (opțional)                          | R8      | 17.12.2026                        |
| M6        | Testare finală, publicare, documentație completă       | toate   | web 19.11, final 17.12.2026       |

Livrabilele din charter: **L1** = M1, **L2** = aplicația web (M2–M4 pe web, publicată pe Vercel), **L3** = aplicația mobilă (M2–M4 pe mobil, APK).

Mărimea sarcinilor: **S** ≤ 3 ore, **M** 3–8 ore, **L** peste 8 ore.

## M1 – Setup și specificații (L1)

| ID    | Sarcină                                                                                                                                                             | Responsabil       | Depinde de | Gata când                                                       | Mărime |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------- | --------------------------------------------------------------- | ------ |
| M1.1  | Repository GitHub, structura monorepo, CI, template-uri PR / issue, prima variantă a documentației                                                                  | David             | –          | ✅ făcut                                                        | L      |
| M1.2  | Invitarea colegilor ca colaboratori pe GitHub (ramura `main` e protejată: merge doar prin PR, cu CI `verify` verde)                                                 | David             | M1.1       | toți pot clona și deschide PR-uri                               | S      |
| M1.3  | Proiect Supabase (Free, Frankfurt): rulare migrație, _Confirm email_ dezactivat pentru dezvoltare, URL + cheia anon trimise echipei pe un canal privat (nu în repo) | David             | M1.1       | tabelele apar în dashboard; testul RLS din `schema-bd.md` trece | S      |
| M1.4  | Revizuirea și completarea `docs/schema-bd.md` și `docs/arhitectura.md`                                                                                              | David (+ Andreas) | M1.3       | documentele sunt aprobate în PR                                 | S      |
| M1.5  | Board Trello: liste Backlog / To Do / In Progress / Review / Done; etichete R1–R8 și web / mobil / backend / docs; câte un card pentru fiecare sarcină de aici      | David             | M1.1       | board-ul e partajat cu echipa și cu coordonatorul               | M      |
| M1.6  | Cazuri de utilizare `docs/user-cases.md`: câte un caz pentru R1–R8 + diagrama cazurilor de utilizare                                                                | Andreas           | –          | documentul e în `main`                                          | M      |
| M1.7  | Wireframe-uri web (Login, Activități, Statistici, categorii, grupuri) în `docs/wireframes/web/`                                                                     | Tudor             | –          | imaginile sunt în `main`                                        | M      |
| M1.8  | Wireframe-uri mobil (cele 3 tab-uri, adăugare activitate, login) în `docs/wireframes/mobile/`                                                                       | Andrei            | –          | imaginile sunt în `main`                                        | M      |
| M1.9  | Fiecare membru: clonează, `npm install`, rulează web și mobil (Expo Go), deschide un prim PR de exercițiu                                                           | toți              | M1.2       | fiecare are cel puțin un PR acceptat                            | S      |
| M1.10 | Semnarea charter-ului; pachetul L1 (charter, specificații, link-uri Trello și GitHub)                                                                               | David             | M1.4–M1.8  | L1 predat                                                       | S      |
| M1.11 | User stories R1–R8 în `docs/user-stories.md`, fiecare cu ID, criterii de acceptare și legătura cu cazurile de utilizare și de test (cerință de la coordonator)      | David             | M1.6       | documentul e în `main`                                          | M      |

## M2 – MVP (R1–R3)

| ID   | Sarcină                                                                                                                                                                                                             | Responsabil | Depinde de | Gata când                                                  | Mărime |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- | ---------------------------------------------------------- | ------ |
| M2.1 | MVP pe web și mobil cu date mock: adăugare, ștergere, Complet / Anulat / Reactivare, cele 4 statusuri; logica și testele în `shared/`                                                                               | David       | M1.1       | PR-ul `feature/mvp-r1-r3` e revizuit și integrat           | L      |
| M2.2 | Interfața web după wireframe-uri: aspect responsive, stări goale, accesibilitate formular (confirmarea la ștergere e în M2.9)                                                                                       | Tudor       | M1.7, M2.1 | arată ca în wireframe pe desktop și pe telefon             | M      |
| M2.3 | Interfața mobilă după wireframe-uri: selectorul de dată / oră pe Android și iOS, stări goale, iconiță și splash KubiDoIt (confirmarea la ștergere e în M2.9)                                                        | Andrei      | M1.8, M2.1 | testat în Expo Go pe Android și iOS                        | M      |
| M2.4 | Tipuri generate (`supabase gen types`) în `shared/src/database.types.ts`; stratul de date `shared/src/api/` (listare, creare, ștergere, schimbare status) care primește clientul Supabase + teste cu client simulat | David       | M1.3       | funcțiile sunt exportate din `@kubidoit/shared` și testate | M      |
| M2.5 | Test RLS cu două conturi (`supabase/tests/`), cu rezultatele trecute în documentație                                                                                                                                | David       | M1.3       | A nu poate citi / modifica / șterge datele lui B           | S      |
| M2.6 | Plan de testare + cazuri de test R1–R3 (matricea statusurilor, limita exactă a termenului) în `docs/testare/`, fiecare cu un ID; rulare manuală pe web, Android, iOS (testele automate sunt în M2.7)                | Andreas     | M2.1       | O3: 100% din cazurile de status trec                       | M      |
| M2.7 | Teste Vitest pentru cazurile din M2.6: matricea statusurilor, validarea, reducerul; fiecare test poartă ID-ul cazului                                                                                               | Andreas     | M2.6       | fiecare caz automatizabil are un test cu același ID        | M      |
| M2.8 | Teste end-to-end web cu Playwright (`web/e2e/`, mod demo): adăugare, statusuri, ștergere, filtre, Statistici; job `e2e` în CI                                                                                       | Andreas     | M2.1       | `npm run test:e2e` trece local și în CI                    | L      |
| M2.9 | Confirmare la ștergere pe web (dialog accesibil) și mobil (`Dialog` din Paper), cu textul comun în `shared/`                                                                                                        | Andreas     | M2.1       | „Anulează” păstrează activitatea pe ambele platforme       | M      |

## M3 – Autentificare, sincronizare (R5), categorii (R4)

| ID    | Sarcină                                                                                                                                               | Responsabil | Depinde de                   | Gata când                                                     | Mărime |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------- | ------------------------------------------------------------- | ------ |
| M3.1  | Setări Auth: email + parolă, URL-uri de redirect (localhost, Vercel, `kubidoit://`)                                                                   | David       | M1.3                         | conturile de test se pot crea și autentifica                  | S      |
| M3.2  | Web: login / înregistrare / logout, sesiune (`onAuthStateChange`), rute protejate; mod demo când lipsește `.env`                                      | Tudor       | M3.1                         | fără sesiune, `/tasks` duce la `/login`                       | M      |
| M3.3  | Web: activitățile din Supabase prin `shared/src/api/` (stări de încărcare și eroare)                                                                  | Tudor       | M2.4, M3.2                   | datele rămân după reîncărcarea paginii                        | M      |
| M3.4  | Mobil: ecrane login / înregistrare, sesiune păstrată, reîmprospătare cu `AppState`, tab-uri protejate, logout în Profil                               | Andrei      | M3.1                         | sesiunea rămâne după repornirea aplicației                    | M      |
| M3.5  | Mobil: activitățile din Supabase prin `shared/src/api/`, pull-to-refresh                                                                              | Andrei      | M2.4, M3.4                   | aceleași date ca pe web                                       | M      |
| M3.6  | Realtime: `subscribeToTasks()` în `shared/`, folosit de ambele aplicații; măsurarea O4                                                                | David       | M3.3, M3.5                   | o modificare pe web apare pe mobil în ≤ 5 s (și invers)       | M      |
| M3.7  | Categorii în `shared/`: API (listare, creare, ștergere) + funcții de filtrare și grupare, cu teste                                                    | David       | M2.4                         | funcțiile sunt exportate și testate                           | M      |
| M3.8  | Web R4: alegerea categoriei în formular, etichete, filtrare, grupare, categorii personalizate                                                         | Tudor       | M3.7                         | lista se poate filtra și grupa pe categorii                   | M      |
| M3.9  | Mobil R4: alegerea categoriei, chip-uri de filtrare, listă grupată (`SectionList`)                                                                    | Andrei      | M3.7                         | ca pe web                                                     | M      |
| M3.10 | Testare R4 / R5: izolarea datelor între conturi, timpul de sincronizare, regresie R1–R3                                                               | Andreas     | M3.3–M3.9                    | raport de test în `docs/testare/`                             | M      |
| M3.11 | Teste e2e web cu Supabase: login / logout și rute protejate (R5), persistență, categorii (R4), sincronizare între două browsere măsurată automat (O4) | Andreas     | M2.8, M3.2, M3.3, M3.6, M3.8 | testele trec cu contul de test; timpul O4 e în raportul M3.10 | L      |

Măsurarea O4 (M3.6, M3.11) se poate face abia după M3.5, când și aplicația mobilă citește din Supabase (03.12). La L2 (19.11), sincronizarea se verifică doar între două browsere.

## M4 – Remindere (R6), statistici (R7)

| ID   | Sarcină                                                                                                                                                         | Responsabil | Depinde de       | Gata când                                 | Mărime |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------- | ----------------------------------------- | ------ |
| M4.1 | `shared/`: activități finalizate azi / săptămâna aceasta, procent de finalizare, momentul reminderului, cu teste                                                | Andrei      | M2.1             | funcțiile sunt exportate și testate       | M      |
| M4.2 | Web R6: comutatorul „Critic”, permisiunea pentru notificări, notificare în browser înainte de termen cât timp aplicația e deschisă                              | Tudor       | M3.3             | notificarea apare la ora calculată        | M      |
| M4.3 | Mobil R6: notificări locale programate cu `expo-notifications`, canal Android, reprogramare la editare / finalizare / ștergere                                  | Andrei      | M3.5, M4.1       | notificarea apare și cu aplicația închisă | L      |
| M4.4 | Web R7: pagina Statistici (contoare zi / săptămână, procent, culori pe status)                                                                                  | Tudor       | M4.1             | cifrele corespund datelor de test         | M      |
| M4.5 | Mobil R7: tab-ul Statistici (charter: dezvoltatorul web ajută la UI-ul mobil)                                                                                   | Tudor       | M4.1             | ca pe web                                 | M      |
| M4.6 | Trecere prin _Security Advisor_ și _Performance Advisor_ din Supabase; testul RLS extins la categorii                                                           | David       | M3.7             | niciun avertisment de securitate rămas    | S      |
| M4.7 | Testare R6 / R7 pe browsere, Android și iOS                                                                                                                     | Andreas     | M4.2–M4.5        | raport de test                            | M      |
| M4.8 | Teste pentru cazurile limită ale statisticilor (miezul nopții, începutul săptămânii, schimbarea orei) și reminderelor; e2e pentru pagina Statistici și „Critic” | Andreas     | M4.1, M4.2, M4.4 | testele trec local și în CI               | M      |

## M5 – Activități de grup (R8, opțional)

David (PM) decide împreună cu echipa dacă R8 intră în scope, în funcție de timpul rămas (charter, secțiunea 11).

| ID   | Sarcină                                                                                                                                                     | Responsabil | Depinde de | Gata când                                      | Mărime |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- | ---------------------------------------------- | ------ |
| M5.1 | Migrația 2: `profiles`, `groups`, `group_members`, `tasks.group_id`, `is_group_member()`, RPC `join_group(invite_code)`, politici RLS (vezi `schema-bd.md`) | David       | M3.6       | testul RLS pentru grupuri trece                | L      |
| M5.2 | API pentru grupuri în `shared/` (creare, intrare cu cod, membri, părăsire), cu teste                                                                        | David       | M5.1       | funcțiile sunt exportate și testate            | M      |
| M5.3 | Web: pagina de grupuri (creare, cod de invitație, membri), activități de grup                                                                               | Tudor       | M5.2       | doi utilizatori văd aceeași activitate de grup | L      |
| M5.4 | Mobil: ecranele de grupuri                                                                                                                                  | Andrei      | M5.2       | ca pe web                                      | L      |
| M5.5 | Testare R8: cine nu e membru nu vede activitățile grupului                                                                                                  | Andreas     | M5.3, M5.4 | raport de test                                 | S      |

## M6 – Testare finală, publicare, documentație

| ID   | Sarcină                                                                                                                 | Responsabil            | Depinde de | Gata când                                        | Mărime |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | ------------------------------------------------ | ------ |
| M6.1 | Publicare pe Vercel (_Root Directory_ `web/`, variabile de mediu) + URL-ul adăugat în Supabase Auth                     | Tudor (+ David)        | M3.2       | aplicația web e online (O1)                      | S      |
| M6.2 | APK Android prin EAS Build (profil `preview`, `buildType: apk`), instalat pe telefoane reale; iOS prin Expo Go          | Andrei                 | M3.5       | APK-ul rulează fără Expo Go (O2)                 | M      |
| M6.3 | Testare de regresie finală pe O1–O7 + `docs/testare/raport-final.md`                                                    | Andreas                | toate      | zero erori critice (O7)                          | M      |
| M6.4 | Ghiduri de utilizare: web (Tudor), mobil (Andrei); README final (Andreas)                                               | Tudor, Andrei, Andreas | M6.1, M6.2 | ghidurile sunt în `docs/`                        | M      |
| M6.5 | Documentația backend finală: schema, RLS, lista migrațiilor, note de securitate                                         | David                  | M5.1       | documentele corespund bazei de date              | S      |
| M6.6 | Scenariul demonstrației și prezentarea finală                                                                           | David                  | M6.3       | prezentarea e gata                               | M      |
| M6.7 | Acoperirea testelor în CI (`@vitest/coverage-v8`, prag minim pe `shared/`) + teste de verificare pe adresa de pe Vercel | Andreas                | M2.8, M6.1 | CI-ul pică sub prag; verificarea trece pe Vercel | M      |

## Sarcinile fiecăruia

- **Andreas (QA Lead + analist de cerințe):** M1.6, M2.6, M3.10, M4.7, M5.5, M6.3, M6.4 (README) – plus revizuirea M1.4. Cod: M2.7, M2.8, M2.9, M3.11, M4.8, M6.7 (teste automate și confirmarea la ștergere), pe ramura `feature/andreas-tests`.
- **Tudor (web):** M1.7, M2.2, M3.2, M3.3, M3.8, M4.2, M4.4, M4.5, M5.3, M6.1, M6.4 (ghid web).
- **Andrei (mobil):** M1.8, M2.3, M3.4, M3.5, M3.9, M4.1, M4.3, M5.4, M6.2, M6.4 (ghid mobil).
- **David (PM + backend):** PM și documente: M1.5, M1.10, M1.11, M6.6, plus planul și ghidurile ținute la zi. Backend: M1.1, M1.2, M1.3, M1.4, M2.1, M2.4, M2.5, M3.1, M3.6, M3.7, M4.6, M5.1, M5.2, M6.5 – plus ajutor la M6.1.
- **Toți:** M1.9. Review-ul e la cerere: autorul îl adaugă pe David (PM) ca revizor când vrea o a doua părere.

Se păstrează organizarea din charter (întâi web, apoi mobil): sarcinile mobile M2.3, M3.4, M3.5, M3.9 și M4.3 vin după livrarea aplicației web (vezi [Calendar](#calendar)), iar Andrei lucrează între timp la `shared/` (M4.1) și ajută la web.

Ghidul fiecăruia, cu sarcinile în ordine și link-urile spre issue-uri: [Andreas](echipa/andreas.md), [Tudor](echipa/tudor.md), [Andrei](echipa/andrei.md), [David](echipa/david.md).

## Definition of Done (pentru orice sarcină)

1. Codul e pe o ramură `feature/…`, `fix/…`, `chore/…` sau `docs/…`, cu commit-uri [Conventional Commits](https://www.conventionalcommits.org/).
2. `npm run lint`, `npm run typecheck` și `npm test` trec local, iar CI-ul e verde pe Pull Request.
3. Autorul a îmbinat PR-ul după CI verde; dacă a cerut review, David (PM) l-a aprobat înainte.
4. Logica folosită de ambele aplicații e în `shared/`, cu teste.
5. Documentația e actualizată (README, `docs/`), dacă a fost nevoie.
6. Cardul din Trello e mutat în _Done_.

## Riscuri tehnice identificate la setup

| Risc                                                                                                                                      | Măsură                                                                                                                                                                                                                        | Cine         |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **Expo Go din magazine rulează doar ultimul SDK.** SDK 58 este deja în pregătire; când apare, Expo Go nu va mai deschide proiecte SDK 57. | Upgrade planificat (`npx expo install expo@^58 --fix`, apoi `npx expo-doctor`), sau Expo Go pentru Android instalat prin `npm run dev:mobile` + tasta `a`. Pe iOS nu există alternativă gratuită.                             | Andrei       |
| **Repository privat + Vercel Hobby.** Publicarea automată poate fi blocată pentru commit-urile altor autori.                              | Publicare din contul proprietarului (Vercel CLI sau GitHub Action cu token-ul proprietarului), sau repository public înainte de L2.                                                                                           | Tudor, David |
| **Notificările push la distanță nu merg în Expo Go pe Android.**                                                                          | R6 folosește notificări **locale** programate (`expo-notifications`), care merg în Expo Go.                                                                                                                                   | Andrei       |
| **Versiuni care trebuie să rămână sincronizate.**                                                                                         | React 19.2.3 identic în web și mobil (Expo SDK 57 îl fixează); TypeScript rămâne pe 6.0 până când typescript-eslint suportă TypeScript 7; React Router rămâne pe 7. Dependențele mobile se adaugă doar cu `npx expo install`. | toți         |
