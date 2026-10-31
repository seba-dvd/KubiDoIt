# Ghid pentru Andreas – Project Manager și testare

Ce ai de făcut în KubiDoIt, în ordine și cu termene. Pe GitHub, toate sarcinile tale sunt adunate în [#2 Sarcinile lui Andreas (PM)][#2]. Fiecare sarcină are issue-ul ei, cu pașii concreți și criteriile „gata când”. Planul întregii echipe e în [plan-proiect.md](../plan-proiect.md).

## Rolul tău

Ești Project Manager: planificare, board-ul Trello, documentație, testare și livrabilele L1–L3 predate la timp. Pe lângă asta scrii **cod**: testele automate ale aplicației (Vitest și Playwright) și confirmarea la ștergere, pe web și pe mobil. Așa ai și tu contribuție tehnică în repository, cum cere charter-ul („contribuție tehnică: testare și dezvoltare”). Conform charter-ului (secțiunea 11) poți reprioritiza cerințele suplimentare și poți scoate R8 din scope, cu acordul echipei. Nu poți schimba cerințele minime R1–R3.

Pe GitHub, fiecare termen din charter e un [milestone](https://github.com/seba-dvd/KubiDoIt/milestones), iar fiecare sarcină din plan e un issue cu responsabil. Pagina de milestone-uri îți arată dintr-o privire ce e întârziat.

## Pornire (o singură dată)

Ca să poți testa, ai nevoie de aplicații pornite local:

1. Instalează Node.js **22.12+** (recomandat 24 LTS), Git și **Expo Go** pe telefon.
2. Clonează și instalează, **din rădăcină**:
   ```bash
   git clone https://github.com/seba-dvd/KubiDoIt.git
   cd KubiDoIt
   npm install
   ```
3. `npm run dev:web` pornește web-ul la http://localhost:5173. `npm run dev:mobile` + codul QR în Expo Go pornește mobilul (aceeași rețea Wi-Fi). Fără `.env` aplicațiile rulează în **mod demo**.
4. Pentru testele cu conturi reale, David îți trimite pe privat URL-ul Supabase și cheia anon, pe care le pui în `web/.env` și `mobile/.env` (copiate din `.env.example`).

## Ramurile tale și fluxul de lucru

Ai două ramuri:

- **`docs/andreas-pm`** (creată din [#12]): documentele, adică cazurile de utilizare, planul și rapoartele de testare, README-ul;
- **`feature/andreas-tests`** (creată din [#55]): codul, adică testele Vitest și Playwright și confirmarea la ștergere.

```bash
git fetch origin
git switch feature/andreas-tests   # sau docs/andreas-pm
git merge origin/main              # înainte de fiecare sarcină nouă
```

1. Documentele se scriu în română. Commit-urile sunt în engleză, după [Conventional Commits](https://www.conventionalcommits.org/): `docs: add use cases`, `test: add R1–R3 status cases`, `feat(web): confirm before deleting a task`.
2. Înainte de PR rulezi `npm run format`. Prettier formatează și Markdown-ul, iar CI-ul verifică formatarea. Apoi rulezi `npm run lint && npm run typecheck && npm test`.
3. PR din ramura potrivită în `main`, cu `Closes #<issue>` în descriere, CI `verify` verde, _Create a merge commit_. Un review de la un coleg e recomandat. Nu șterge ramura după merge.

## Ce faci acum

1. **Testează [PR #1](https://github.com/seba-dvd/KubiDoIt/pull/1) (MVP)** pe web și în Expo Go (`git switch feature/mvp-r1-r3`, `npm install`, apoi cele două comenzi `dev`). Lasă un review: aprobare sau comentarii.
2. Livrabilul **L1** (termen 22.10, a trecut). Confirmă cu coordonatorul ce mai trebuie predat și până când, apoi:
   - [#8] M1.5 – board-ul Trello, cu câte un card pentru fiecare issue de pe GitHub;
   - [#9] M1.6 – cazurile de utilizare R1–R8 + diagrama;
   - [#7] M1.4 – revizuirea documentației, împreună cu David;
   - [#16] M1.10 – semnarea charter-ului și pachetul L1. Repository-ul e privat: stabilește cu David cum primește coordonatorul acces.
3. [#12] **Pornire**: primul tău PR din ramură (de exemplu cel pentru [#9]) închide acest issue.
4. Spre checkpoint-ul web din **05.11**, în ordinea asta:
   - [#22] M2.6 – planul de testare și cazurile R1–R3, fiecare cu un ID;
   - [#57] M2.9 – confirmarea la ștergere (cod în `shared/`, `web/` și `mobile/`); e cea mai concretă, pornește cu ea;
   - [#55] M2.7 – cazurile din M2.6 ca teste Vitest;
   - [#56] M2.8 – testele end-to-end pe web cu Playwright și job-ul lor în CI.

## Calendarul tău

| Termen            | Issue | Sarcina                                                         | Așteaptă după                     |
| ----------------- | ----- | --------------------------------------------------------------- | --------------------------------- |
| **22.10** · L1    | [#12] | M1.9 Pornire + primul PR                                        | –                                 |
|                   | [#8]  | M1.5 Board-ul Trello                                            | –                                 |
|                   | [#9]  | M1.6 Cazuri de utilizare R1–R8 + diagrama                       | –                                 |
|                   | [#7]  | M1.4 Revizuirea documentației (cu David)                        | [#6] (David)                      |
|                   | [#16] | M1.10 Semnarea charter-ului + pachetul L1                       | [#7], [#8], [#9], [#10], [#11]    |
| **05.11** · web   | [#22] | M2.6 Plan de testare + cazuri de test R1–R3                     | PR #1                             |
|                   | [#57] | M2.9 Confirmare la ștergere, web + mobil (**cod**)              | –                                 |
|                   | [#55] | M2.7 Teste Vitest pentru cazurile R1–R3 (**cod**)               | [#22]                             |
|                   | [#56] | M2.8 Teste e2e web cu Playwright + CI (**cod**)                 | –                                 |
| **19.11** · L2    | [#50] | M6.4 README final (partea web; la L3 se adaugă mobilul)         | [#45] (Tudor)                     |
|                   | [#58] | M3.11 Teste e2e: login, categorii, sincronizare O4 (**cod**)    | [#56], [#24], [#25], [#28], [#30] |
|                   | [#59] | M4.8 Teste pentru statistici și remindere (**cod**)             | [#33], [#34], [#36]               |
| **03.12** · mobil | [#32] | M3.10 Testare R4 / R5: izolarea datelor, sincronizare, regresie | [#25]–[#31]                       |
| **17.12** · L3    | [#39] | M4.7 Testare R6 / R7 pe browsere, Android, iOS                  | [#34]–[#37]                       |
|                   | [#47] | M6.3 Regresia finală O1–O7 + raportul final                     | toate                             |
|                   | [#52] | M6.6 Scenariul demonstrației și prezentarea finală              | [#47]                             |
|                   | [#60] | M6.7 Acoperirea testelor în CI + verificare pe Vercel (**cod**) | [#56], [#45]                      |
|                   | [#44] | M5.5 Testare R8 (opțional)                                      | [#42], [#43]                      |

Partea web din [#32] și [#39] se testează **înainte de L2 (19.11)**, ca erorile să fie reparate până la predare.

## Codul tău, pe scurt

- **Teste unitare (Vitest):** stau lângă cod, în `shared/src/*.test.ts`. Rulezi `npm test`, sau un singur fișier cu `npm test -- shared/src/status.test.ts`. Modele: `status.test.ts`, `validation.test.ts`, `tasks-reducer.test.ts`.
- **Teste end-to-end (Playwright):** în `web/e2e/`, după [#56]. Deschid aplicația într-un browser real și o folosesc ca un utilizator. Rulezi `npm run test:e2e`; cu `npx playwright test --ui` vezi pașii pe ecran.
- **Confirmarea la ștergere** ([#57]): textul comun în `shared/src/labels.ts`, dialogul pe web în `web/src/components/`, pe mobil în `mobile/components/TaskCard.tsx`.
- O eroare găsită de un test devine un issue cu template-ul _Raport de eroare_, atribuit celui care răspunde de zonă. Testul rămâne în cod și confirmă reparația.
- Înainte de PR: `npm run lint && npm run typecheck && npm test` (și `npm run test:e2e` după [#56]).

## Ce mai urmărești ca PM

- **Decizia pentru R8** (activități de grup, [#40]–[#44]): ia-o cu echipa cel târziu după L2 (19.11), în funcție de timpul rămas. Dacă R8 iese din scope, închide issue-urile cu eticheta `opțional` și notează decizia în `docs/plan-proiect.md`.
- **Săptămânal:** treci prin [milestone-uri](https://github.com/seba-dvd/KubiDoIt/milestones), vezi ce e întârziat și cine e blocat (coloanele „Așteaptă după” din ghidurile colegilor).
- **PR-urile** să primească review în 1–2 zile. Un PR blocat întârzie toată echipa.
- **Erorile** găsite la testare devin issue-uri noi, cu template-ul _Raport de eroare_, atribuite celui care răspunde de zonă.
- **Trello și GitHub** rămân sincronizate: fiecare card are link-ul issue-ului, iar cardul trece în _Done_ când issue-ul se închide.
- `docs/plan-proiect.md` și aceste ghiduri se țin la zi când se schimbă ceva.

## Definition of Done

Valabilă pentru orice sarcină: vezi [plan-proiect.md → Definition of Done](../plan-proiect.md#definition-of-done-pentru-orice-sarcină).

[#2]: https://github.com/seba-dvd/KubiDoIt/issues/2
[#6]: https://github.com/seba-dvd/KubiDoIt/issues/6
[#7]: https://github.com/seba-dvd/KubiDoIt/issues/7
[#8]: https://github.com/seba-dvd/KubiDoIt/issues/8
[#9]: https://github.com/seba-dvd/KubiDoIt/issues/9
[#10]: https://github.com/seba-dvd/KubiDoIt/issues/10
[#11]: https://github.com/seba-dvd/KubiDoIt/issues/11
[#12]: https://github.com/seba-dvd/KubiDoIt/issues/12
[#16]: https://github.com/seba-dvd/KubiDoIt/issues/16
[#22]: https://github.com/seba-dvd/KubiDoIt/issues/22
[#24]: https://github.com/seba-dvd/KubiDoIt/issues/24
[#25]: https://github.com/seba-dvd/KubiDoIt/issues/25
[#28]: https://github.com/seba-dvd/KubiDoIt/issues/28
[#30]: https://github.com/seba-dvd/KubiDoIt/issues/30
[#31]: https://github.com/seba-dvd/KubiDoIt/issues/31
[#32]: https://github.com/seba-dvd/KubiDoIt/issues/32
[#33]: https://github.com/seba-dvd/KubiDoIt/issues/33
[#34]: https://github.com/seba-dvd/KubiDoIt/issues/34
[#36]: https://github.com/seba-dvd/KubiDoIt/issues/36
[#37]: https://github.com/seba-dvd/KubiDoIt/issues/37
[#39]: https://github.com/seba-dvd/KubiDoIt/issues/39
[#40]: https://github.com/seba-dvd/KubiDoIt/issues/40
[#42]: https://github.com/seba-dvd/KubiDoIt/issues/42
[#43]: https://github.com/seba-dvd/KubiDoIt/issues/43
[#44]: https://github.com/seba-dvd/KubiDoIt/issues/44
[#45]: https://github.com/seba-dvd/KubiDoIt/issues/45
[#47]: https://github.com/seba-dvd/KubiDoIt/issues/47
[#50]: https://github.com/seba-dvd/KubiDoIt/issues/50
[#52]: https://github.com/seba-dvd/KubiDoIt/issues/52
[#55]: https://github.com/seba-dvd/KubiDoIt/issues/55
[#56]: https://github.com/seba-dvd/KubiDoIt/issues/56
[#57]: https://github.com/seba-dvd/KubiDoIt/issues/57
[#58]: https://github.com/seba-dvd/KubiDoIt/issues/58
[#59]: https://github.com/seba-dvd/KubiDoIt/issues/59
[#60]: https://github.com/seba-dvd/KubiDoIt/issues/60
