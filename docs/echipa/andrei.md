# Ghid pentru Andrei – dezvoltator mobil

Ce ai de făcut în KubiDoIt, în ordine și cu termene. Pe GitHub, toate sarcinile tale sunt adunate în [#4 Sarcinile lui Andrei (mobil)][#4]. Fiecare sarcină are issue-ul ei, cu pașii concreți și criteriile „gata când”. Planul întregii echipe e în [plan-proiect.md](../plan-proiect.md).

## Rolul tău

Răspunzi de aplicația mobilă din `mobile/`: React Native, Expo SDK 57, Expo Router, React Native Paper. Logica folosită și de web (tipuri, `computeStatus()`, etichete, culori, statistici) stă în `shared/` și se importă din `@kubidoit/shared`; nu o copia în `mobile/`.

Charter-ul cere **întâi aplicația web** (L2, 19.11), apoi pe cea mobilă (checkpoint 03.12, L3 17.12). Până la L2 lucrezi la funcțiile comune din `shared/` ([#33]) și ajuți la web. Ecranele mobile vin după.

## Pornire (o singură dată)

1. Instalează Node.js **22.12+** (recomandat 24 LTS), Git și **Expo Go** pe telefon (Android sau iOS).
2. Clonează și instalează, **din rădăcină**:
   ```bash
   git clone https://github.com/seba-dvd/KubiDoIt.git
   cd KubiDoIt
   npm install
   ```
3. `npm run dev:mobile`, apoi scanezi codul QR cu Expo Go (pe Android din aplicație, pe iOS cu camera). Telefonul și calculatorul trebuie să fie în aceeași rețea Wi-Fi. În terminal, `a` deschide emulatorul Android, iar `w` versiunea web. Fără `mobile/.env` aplicația rulează în **mod demo**, cu date mock.
4. Când David termină proiectul Supabase ([#6]), îți trimite pe privat URL-ul și cheia anon. Rulezi `cp mobile/.env.example mobile/.env` și completezi `EXPO_PUBLIC_SUPABASE_URL` și `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Fișierul `.env` nu se urcă pe GitHub.

## Ramura ta și fluxul de lucru

Ramura ta este **`feature/andrei-mobile`**, creată din issue-ul [#14] (o vezi la _Development_).

```bash
git fetch origin
git switch feature/andrei-mobile
git merge origin/main   # înainte de fiecare sarcină nouă
```

Pentru fiecare sarcină:

1. Lucrezi pe ramura ta. Commit-urile sunt în engleză, după [Conventional Commits](https://www.conventionalcommits.org/): `feat(mobile): add login screen`, `feat(shared): add weekly stats`, `docs: add mobile wireframes`.
2. Înainte de PR rulezi `npm run lint && npm run format:check && npm run typecheck && npm test`. Dacă `format:check` pică, `npm run format` repară formatarea.
3. `git push`, apoi deschizi un PR din `feature/andrei-mobile` în `main`. Completezi template-ul și scrii `Closes #<issue>` în descriere. Pentru ecrane, pune capturi de pe telefon.
4. Aștepți să fie verde CI-ul `verify`. Review-ul e la cerere: dacă vrei o a doua părere, îl adaugi pe David (PM) ca revizor.
5. Merge cu _Create a merge commit_. **Nu șterge ramura**: după merge continui pe ea, cu `git merge origin/main`.

Un PR acoperă o singură sarcină, ca să fie ușor de urmărit și, la nevoie, de revizuit. Pentru o sarcină mare poți face și o ramură separată din `main` (`feature/<descriere>`).

## Ce faci acum

1. **Revizuiește [PR #1](https://github.com/seba-dvd/KubiDoIt/pull/1) (MVP), partea mobilă**: `mobile/` și `shared/`. Rulează-l în Expo Go (`git switch feature/mvp-r1-r3`, `npm install`, `npm run dev:mobile`). Fără o aprobare nu se poate face merge.
2. [#14] **Pornire**: proiectul rulează la tine, iar primul PR din ramura ta închide acest issue.
3. [#11] **M1.8 – wireframe-urile mobile**. Termenul L1 (22.10) a trecut, deci e prima ta prioritate.
4. [#33] **M4.1 – statistici și momentul reminderului în `shared/`**, până la L2 (19.11). Tudor are nevoie de ele pentru [#34] și [#36], așa că începe-l cât mai devreme.

## Calendarul tău

| Termen            | Issue | Sarcina                                             | Așteaptă după        |
| ----------------- | ----- | --------------------------------------------------- | -------------------- |
| **22.10** · L1    | [#14] | M1.9 Pornire + primul PR                            | –                    |
|                   | [#11] | M1.8 Wireframe-uri mobile                           | –                    |
| **19.11** · L2    | [#33] | M4.1 Statistici + momentul reminderului (`shared/`) | PR #1                |
| **03.12** · mobil | [#19] | M2.3 Interfața după wireframe-uri                   | [#11], PR #1         |
|                   | [#26] | M3.4 Login, înregistrare, sesiune păstrată, logout  | [#23] (David)        |
|                   | [#27] | M3.5 Activitățile din Supabase + pull-to-refresh    | [#20] (David), [#26] |
|                   | [#31] | M3.9 Categorii (R4)                                 | [#29] (David)        |
| **17.12** · L3    | [#35] | M4.3 Notificări locale cu `expo-notifications` (R6) | [#27], [#33]         |
|                   | [#46] | M6.2 APK Android prin EAS Build                     | [#27]                |
|                   | [#49] | M6.4 Ghidul de utilizare mobil                      | [#46]                |
|                   | [#43] | M5.4 Ecranele de grupuri (R8, opțional)             | [#41] (David)        |

Tudor face tab-ul Statistici pe mobil ([#37]); stabiliți împreună cine ce fișiere atinge.

## Depinzi de / depind de tine

- **Aștepți de la David:** proiectul Supabase [#6], setările Auth [#23], stratul de date [#20], categoriile [#29], sincronizarea [#28] (o integrați împreună în `mobile/`).
- **Te așteaptă:** Tudor, pentru [#34], [#36] și [#37], pe funcțiile din [#33]; Andreas, care testează mobilul ([#32], [#39]); APK-ul [#46] intră în L3 și în README-ul final [#50].

## Reguli pentru zona ta

- Dependențele mobile se instalează **doar** cu `cd mobile && npx expo install <pachet>`, ca versiunea să fie compatibilă cu SDK-ul. Nu folosi `npm install -w` pentru mobil.
- **React 19.2.3** e fixat identic în web și mobil. Nu-l schimba.
- **Riscul Expo Go:** Expo Go din magazine rulează doar ultimul SDK. Când apare SDK 58, Expo Go nu mai deschide proiectul pe SDK 57. Upgrade-ul se face cu `npx expo install expo@^58 --fix`, apoi `npx expo-doctor`, într-un PR separat, anunțat echipei. Pe Android, Expo Go potrivit se instalează și din `npm run dev:mobile` + tasta `a`.
- **Notificările** sunt locale, programate cu `expo-notifications`. Push-ul la distanță nu merge în Expo Go pe Android.
- Sesiunea Supabase se păstrează prin `expo-sqlite/localStorage` (deja în `mobile/lib/supabase.ts`), nu prin AsyncStorage.
- În aplicație intră doar cheia **anon** (`EXPO_PUBLIC_SUPABASE_ANON_KEY`), niciodată `service_role`.
- Codul din `shared/` (de exemplu [#33]) e TypeScript pur, fără React Native și fără React. Are teste Vitest lângă el (`*.test.ts`).

## Definition of Done

Valabilă pentru orice sarcină: vezi [plan-proiect.md → Definition of Done](../plan-proiect.md#definition-of-done-pentru-orice-sarcină).

[#4]: https://github.com/seba-dvd/KubiDoIt/issues/4
[#6]: https://github.com/seba-dvd/KubiDoIt/issues/6
[#11]: https://github.com/seba-dvd/KubiDoIt/issues/11
[#14]: https://github.com/seba-dvd/KubiDoIt/issues/14
[#19]: https://github.com/seba-dvd/KubiDoIt/issues/19
[#20]: https://github.com/seba-dvd/KubiDoIt/issues/20
[#23]: https://github.com/seba-dvd/KubiDoIt/issues/23
[#26]: https://github.com/seba-dvd/KubiDoIt/issues/26
[#27]: https://github.com/seba-dvd/KubiDoIt/issues/27
[#28]: https://github.com/seba-dvd/KubiDoIt/issues/28
[#29]: https://github.com/seba-dvd/KubiDoIt/issues/29
[#31]: https://github.com/seba-dvd/KubiDoIt/issues/31
[#32]: https://github.com/seba-dvd/KubiDoIt/issues/32
[#33]: https://github.com/seba-dvd/KubiDoIt/issues/33
[#34]: https://github.com/seba-dvd/KubiDoIt/issues/34
[#35]: https://github.com/seba-dvd/KubiDoIt/issues/35
[#36]: https://github.com/seba-dvd/KubiDoIt/issues/36
[#37]: https://github.com/seba-dvd/KubiDoIt/issues/37
[#39]: https://github.com/seba-dvd/KubiDoIt/issues/39
[#41]: https://github.com/seba-dvd/KubiDoIt/issues/41
[#43]: https://github.com/seba-dvd/KubiDoIt/issues/43
[#46]: https://github.com/seba-dvd/KubiDoIt/issues/46
[#49]: https://github.com/seba-dvd/KubiDoIt/issues/49
[#50]: https://github.com/seba-dvd/KubiDoIt/issues/50
