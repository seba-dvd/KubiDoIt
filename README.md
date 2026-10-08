# KubiDoIt
To-do app – React (web) + React Native (mobil) + Supabase

KubiDoIt este o aplicație web și mobilă de tip listă de activități, pentru persoane care își organizează timpul și pentru grupuri (prieteni, familii) care împart sarcini comune. Datele sunt sincronizate între web, Android și iOS.

Proiect realizat în cadrul disciplinei SOPM – Universitatea Transilvania din Brașov, Facultatea de Inginerie Electrică și Știința Calculatoarelor. Detalii complete în [Project Charter](docs/project-charter/Schita_ProjectCharter.md).

## Echipa

| Membru | Rol | Responsabil de |
|---|---|---|
| Nicolescu Andreas | Project Manager | planificare, Trello, documentație, testare |
| Mituleci Tudor | Dezvoltator Frontend Web | `apps/web` |
| Kubanda Andrei | Dezvoltator Mobil | `apps/mobile` |
| Pilat David | Dezvoltator Backend | `supabase`, securitate, sincronizare |

Coordonator: Corneliu Zaharia.

## Tehnologii

TypeScript · React + Vite (web) · React Native + Expo (mobil) · Supabase (PostgreSQL, Auth, Realtime) · expo-notifications · Vercel (publicare web)

## Structura repository-ului

```
├── apps/
│   ├── web/             # aplicația web – React + Vite + TypeScript
│   └── mobile/          # aplicația mobilă – React Native + Expo + TypeScript
├── packages/
│   └── shared/          # cod TypeScript comun web + mobil (tipuri, logica statusurilor)
├── supabase/            # migrații SQL, politici RLS, date de test
├── docs/
│   ├── project-charter/ # project charter (L1)
│   ├── database/        # schema bazei de date (L5)
│   ├── ui-mockups/      # schițe UI
│   └── guides/          # ghid de instalare și utilizare (L5)
└── .github/             # template-uri pentru issues și pull requests
```

### Inițializarea aplicațiilor

Folderele `apps/web` și `apps/mobile` conțin deocamdată doar un `.gitkeep`. Aplicațiile se generează din rădăcina repo-ului:

```bash
npm create vite@latest apps/web -- --template react-ts
```

```bash
npx create-expo-app@latest apps/mobile
```

La Vite, dacă întreabă ce să facă cu fișierele existente, alegeți „Ignore files and continue”. După generare, `.gitkeep` se poate șterge.

Pentru a folosi `packages/shared` din ambele aplicații, se poate adăuga ulterior un `package.json` la rădăcină cu npm workspaces (`apps/*`, `packages/*`).

## Flux de lucru Git

1. Nu se lucrează direct pe `main`. Pentru fiecare sarcină se creează o ramură nouă din `main`:
   - `feature/<descriere>` – funcționalitate nouă (ex. `feature/adaugare-activitati`)
   - `fix/<descriere>` – corectare de erori
   - `docs/<descriere>` – documentație
2. Commit-uri mici, cu mesaje clare (ex. „Adaugă formularul de creare a activităților”).
3. Când sarcina e gata: Pull Request în `main`, revizuit de cel puțin un coleg.
4. Fiecare sarcină are un card corespondent în Trello.
5. Cheile și parolele (ex. cheile Supabase) stau doar în fișiere `.env`, care nu se urcă pe GitHub. În repo se pune doar `.env.example`, cu numele variabilelor.

## Milestone-uri

| Milestone | Conținut | Termen |
|---|---|---|
| M0 | Project charter aprobat | 15.10.2026 |
| M1 | Setup: repository, proiect Supabase, schema BD, board Trello, schițe UI | 25.10.2026 |
| M2 | MVP: adăugare / ștergere activități + cele 4 statusuri (R1–R3) | 15.11.2026 |
| M3 | Autentificare, sincronizare și categorii (R4, R5) | 29.11.2026 |
| M4 | Remindere și statistici de eficiență (R6, R7) | 13.12.2026 |
| M5 | Activități de grup (R8) | 10.01.2027 |
| M6 | Testare finală, publicare, documentație completă | 17.01.2027 |
