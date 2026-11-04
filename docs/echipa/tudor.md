# Ghid pentru Tudor – dezvoltator web

Ce ai de făcut în KubiDoIt, în ordine și cu termene. Pe GitHub, toate sarcinile tale sunt adunate în [#3 Sarcinile lui Tudor (web)][#3]. Fiecare sarcină are issue-ul ei, cu pașii concreți și criteriile „gata când”. Planul întregii echipe e în [plan-proiect.md](../plan-proiect.md).

## Rolul tău

Răspunzi de aplicația web din `web/`: React 19, Vite, TypeScript, React Router 7. Logica folosită și de mobil (tipuri, `computeStatus()`, etichete, culori, statistici) stă în `shared/` și se importă din `@kubidoit/shared`; nu o copia în `web/`.

## Pornire (o singură dată)

1. Instalează Node.js **22.12+** (recomandat 24 LTS) și Git.
2. Clonează și instalează, **din rădăcină**:
   ```bash
   git clone https://github.com/seba-dvd/KubiDoIt.git
   cd KubiDoIt
   npm install
   ```
3. `npm run dev:web` pornește aplicația la http://localhost:5173. Fără `web/.env` rulează în **mod demo**, cu date mock.
4. Când David termină proiectul Supabase ([#6]), îți trimite pe privat URL-ul și cheia anon. Rulezi `cp web/.env.example web/.env` și completezi `VITE_SUPABASE_URL` și `VITE_SUPABASE_ANON_KEY`. Fișierul `.env` nu se urcă pe GitHub.

## Ramura ta și fluxul de lucru

Ramura ta este **`feature/tudor-web`**, creată din issue-ul [#13] (o vezi la _Development_).

```bash
git fetch origin
git switch feature/tudor-web
git merge origin/main   # înainte de fiecare sarcină nouă
```

Pentru fiecare sarcină:

1. Lucrezi pe ramura ta. Commit-urile sunt în engleză, după [Conventional Commits](https://www.conventionalcommits.org/): `feat(web): add login page`, `fix(web): keep filter after delete`, `docs: add web wireframes`.
2. Înainte de PR rulezi `npm run lint && npm run format:check && npm run typecheck && npm test`. Dacă `format:check` pică, `npm run format` repară formatarea.
3. `git push`, apoi deschizi un PR din `feature/tudor-web` în `main`. Completezi template-ul și scrii `Closes #<issue>` în descriere.
4. Ceri review unui coleg. CI-ul `verify` trebuie să fie verde.
5. Merge cu _Create a merge commit_. **Nu șterge ramura**: după merge continui pe ea, cu `git merge origin/main`.

Un PR acoperă o singură sarcină, ca să fie revizuit repede. Pentru o sarcină mare poți face și o ramură separată din `main` (`feature/<descriere>`).

## Ce faci acum

1. **Revizuiește [PR #1](https://github.com/seba-dvd/KubiDoIt/pull/1) (MVP), partea web**: `web/` și `shared/`. Rulează-l local (`git switch feature/mvp-r1-r3`, apoi `npm run dev:web`). Fără o aprobare nu se poate face merge, iar M2.2 pornește de la codul lui.
2. [#13] **Pornire**: proiectul rulează la tine, iar primul PR din ramura ta închide acest issue.
3. [#10] **M1.7 – wireframe-urile web**. Termenul L1 (22.10) a trecut, deci e prima ta prioritate.
4. Spre checkpoint-ul web din **05.11**: [#18] M2.2, apoi [#24] M3.2 (după [#23] de la David) și [#25] M3.3 (după [#20] de la David).

## Calendarul tău

| Termen          | Issue | Sarcina                                               | Așteaptă după         |
| --------------- | ----- | ----------------------------------------------------- | --------------------- |
| **22.10** · L1  | [#13] | M1.9 Pornire + primul PR                              | –                     |
|                 | [#10] | M1.7 Wireframe-uri web                                | –                     |
| **05.11** · web | [#18] | M2.2 Interfața după wireframe-uri                     | [#10], PR #1          |
|                 | [#24] | M3.2 Login, înregistrare, logout, rute protejate      | [#23] (David)         |
|                 | [#25] | M3.3 Activitățile din Supabase                        | [#20] (David), [#24]  |
| **19.11** · L2  | [#30] | M3.8 Categorii (R4)                                   | [#29] (David)         |
|                 | [#34] | M4.2 Activități „Critic” + notificări în browser (R6) | [#25], [#33] (Andrei) |
|                 | [#36] | M4.4 Pagina Statistici (R7)                           | [#33] (Andrei)        |
|                 | [#45] | M6.1 Publicare pe Vercel (cu David)                   | [#24]                 |
|                 | [#48] | M6.4 Ghidul de utilizare web                          | [#45]                 |
| **17.12** · L3  | [#37] | M4.5 Tab-ul Statistici pe mobil (ajuți la mobil)      | [#33] (Andrei)        |
|                 | [#42] | M5.3 Pagina de grupuri (R8, opțional)                 | [#41] (David)         |

L2 (19.11) e livrabilul tău principal: aplicația web publicată, cu R1–R7 și documentație.

## Depinzi de / depind de tine

- **Aștepți de la David:** proiectul Supabase [#6], setările Auth [#23], stratul de date [#20], categoriile [#29], sincronizarea [#28].
- **Aștepți de la Andrei:** funcțiile de statistici și de reminder [#33], pentru [#34] și [#36].
- **Te așteaptă:** Andreas testează partea web ([#32], [#39]), README-ul final [#50] are nevoie de URL-ul Vercel [#45], iar David integrează Realtime în `web/` împreună cu tine ([#28]).

## Reguli pentru zona ta

- Dependențele noi se instalează din rădăcină: `npm install <pachet> -w @kubidoit/web`.
- **React 19.2.3** e fixat identic în web și mobil (cerut de Expo SDK 57). Nu-l actualiza doar în web, altfel npm instalează două copii de React.
- **React Router rămâne pe 7** și TypeScript pe ~6.0.
- În aplicație intră doar cheia **anon** (`VITE_SUPABASE_ANON_KEY`). Cheia `service_role` nu apare niciodată în cod.
- **Modul demo** (fără `.env`) trebuie să meargă mereu.
- Statusul afișat se calculează cu `computeStatus(task, now)` din `@kubidoit/shared`. Restant / Urmează nu se salvează în baza de date.

## Definition of Done

Valabilă pentru orice sarcină: vezi [plan-proiect.md → Definition of Done](../plan-proiect.md#definition-of-done-pentru-orice-sarcină).

[#3]: https://github.com/seba-dvd/KubiDoIt/issues/3
[#6]: https://github.com/seba-dvd/KubiDoIt/issues/6
[#10]: https://github.com/seba-dvd/KubiDoIt/issues/10
[#13]: https://github.com/seba-dvd/KubiDoIt/issues/13
[#18]: https://github.com/seba-dvd/KubiDoIt/issues/18
[#20]: https://github.com/seba-dvd/KubiDoIt/issues/20
[#23]: https://github.com/seba-dvd/KubiDoIt/issues/23
[#24]: https://github.com/seba-dvd/KubiDoIt/issues/24
[#25]: https://github.com/seba-dvd/KubiDoIt/issues/25
[#28]: https://github.com/seba-dvd/KubiDoIt/issues/28
[#29]: https://github.com/seba-dvd/KubiDoIt/issues/29
[#30]: https://github.com/seba-dvd/KubiDoIt/issues/30
[#32]: https://github.com/seba-dvd/KubiDoIt/issues/32
[#33]: https://github.com/seba-dvd/KubiDoIt/issues/33
[#34]: https://github.com/seba-dvd/KubiDoIt/issues/34
[#36]: https://github.com/seba-dvd/KubiDoIt/issues/36
[#37]: https://github.com/seba-dvd/KubiDoIt/issues/37
[#39]: https://github.com/seba-dvd/KubiDoIt/issues/39
[#41]: https://github.com/seba-dvd/KubiDoIt/issues/41
[#42]: https://github.com/seba-dvd/KubiDoIt/issues/42
[#45]: https://github.com/seba-dvd/KubiDoIt/issues/45
[#48]: https://github.com/seba-dvd/KubiDoIt/issues/48
[#50]: https://github.com/seba-dvd/KubiDoIt/issues/50
