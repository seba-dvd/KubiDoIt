# KubiDoIt

To-do app – React (web) + React Native (mobil) + Supabase

KubiDoIt este o aplicație web și mobilă de tip listă de activități, pentru persoane care își organizează timpul și pentru grupuri (prieteni, familii) care împart sarcini comune. Datele sunt sincronizate între web, Android și iOS.

Proiect realizat în cadrul disciplinei SOPM – Universitatea Transilvania din Brașov, Facultatea de Inginerie Electrică și Știința Calculatoarelor. Detalii complete în [Project Charter](docs/project-charter/Schita_ProjectCharter.md).

## Echipa

| Membru            | Rol                      | Responsabil de                             |
| ----------------- | ------------------------ | ------------------------------------------ |
| Nicolescu Andreas | Project Manager          | planificare, Trello, documentație, testare |
| Mituleci Tudor    | Dezvoltator Frontend Web | `web/`                                     |
| Kubanda Andrei    | Dezvoltator Mobil        | `mobile/`                                  |
| Pilat David       | Dezvoltator Backend      | `supabase/`, securitate, sincronizare      |

Coordonator: Corneliu Zaharia.

Împărțirea sarcinilor pe milestone-uri și pe membri: [docs/plan-proiect.md](docs/plan-proiect.md).

## Stack

| Parte        | Tehnologii                                                 |
| ------------ | ---------------------------------------------------------- |
| Web          | React 19, Vite, TypeScript, React Router 7                 |
| Mobil        | React Native, Expo SDK 57, Expo Router, React Native Paper |
| Cod comun    | TypeScript, Vitest                                         |
| Backend      | Supabase (PostgreSQL, Auth, Row Level Security, Realtime)  |
| Calitate cod | ESLint, Prettier                                           |
| Publicare    | Vercel (web), Expo Go / APK (mobil)                        |

## Structura

Monorepo cu [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces): o singură instalare din rădăcină pentru toate pachetele.

```
├── web/          # aplicația web (@kubidoit/web)
│   └── src/      # pages/ (Login, Tasks, Stats), components/, lib/supabase.ts
├── mobile/       # aplicația mobilă (@kubidoit/mobile)
│   ├── app/      # ecranele (Expo Router): tab-urile Tasks, Stats, Profile
│   └── lib/      # supabase.ts
├── shared/       # cod comun web + mobil (@kubidoit/shared)
│   └── src/      # tipuri, computeStatus(), culori și etichete, date mock, teste
├── supabase/     # config.toml și migrațiile SQL
├── docs/         # project charter, schema BD, ghiduri, schițe UI
└── .github/      # template-uri pentru issues și pull requests
```

Logica folosită de ambele aplicații (de exemplu calculul statusului unei activități) stă **doar** în `shared/` și se importă din `@kubidoit/shared`.

## Instalare și rulare

### Cerințe

- [Node.js](https://nodejs.org/) **22.12 sau mai nou** (recomandat Node 24 LTS);
- Git;
- pentru mobil: aplicația **Expo Go** pe telefon (Android sau iOS), sau un emulator Android.

### Pași

1. Clonează repository-ul și instalează dependențele, **din rădăcină**:
   ```bash
   git clone https://github.com/seba-dvd/KubiDoIt.git
   ```
   ```bash
   cd KubiDoIt
   ```
   ```bash
   npm install
   ```
2. Creează fișierele `.env` pornind de la exemple și completează-le (vezi [Configurarea Supabase](#configurarea-supabase)):
   ```bash
   cp web/.env.example web/.env
   ```
   ```bash
   cp mobile/.env.example mobile/.env
   ```
   Aplicațiile pornesc și fără `.env`, deocamdată, pentru că folosesc date mock.
3. Pornește aplicația web, la http://localhost:5173:
   ```bash
   npm run dev:web
   ```
4. Pornește aplicația mobilă:
   ```bash
   npm run dev:mobile
   ```
   Scanează codul QR cu Expo Go: pe Android direct din aplicație, pe iOS cu camera. Telefonul și calculatorul trebuie să fie în aceeași rețea Wi-Fi. În terminal, `a` deschide emulatorul Android, iar `w` deschide versiunea web.

### Scripturi (din rădăcină)

| Comandă              | Ce face                                   |
| -------------------- | ----------------------------------------- |
| `npm run dev:web`    | pornește aplicația web (Vite)             |
| `npm run dev:mobile` | pornește serverul Expo                    |
| `npm run build:web`  | build de producție pentru web             |
| `npm test`           | testele unitare din `shared/` (Vitest)    |
| `npm run lint`       | ESLint pe tot proiectul                   |
| `npm run typecheck`  | verificarea TypeScript în toate pachetele |
| `npm run format`     | formatează codul cu Prettier              |

Dependențele noi se instalează tot din rădăcină:

- web: `npm install <pachet> -w @kubidoit/web`;
- mobil: `cd mobile`, apoi `npx expo install <pachet>`, ca versiunea să fie compatibilă cu Expo.

## Configurarea Supabase

1. Creează un cont pe [supabase.com](https://supabase.com) și un proiect nou: plan **Free**, regiune **Central EU (Frankfurt)**. Notează parola bazei de date.
2. Aplică migrațiile din `supabase/migrations/`, **în ordinea numelor**, într-unul din două moduri:
   - **SQL Editor** (cel mai simplu): în dashboard, la _SQL Editor → New query_, lipește conținutul fiecărui fișier, în ordine, și apasă _Run_.
   - **Supabase CLI**:
     ```bash
     npx supabase login
     ```
     ```bash
     npx supabase link --project-ref <id-proiect>
     ```
     ```bash
     npx supabase db push
     ```
3. Copiază cheile din _Project Settings → API Keys_:
   - **Project URL** merge în `VITE_SUPABASE_URL` (web/.env) și în `EXPO_PUBLIC_SUPABASE_URL` (mobile/.env);
   - cheia **anon** (sau **publishable**, în proiectele noi) merge în `VITE_SUPABASE_ANON_KEY` și în `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

   Cheia anon e publică prin natura ei: ajunge în aplicație, iar datele sunt protejate de Row Level Security. Cheia **service_role / secret** nu se folosește niciodată în aplicații și nu se pune în niciun fișier din repo.

4. Pentru dezvoltare, în _Authentication → Sign In / Providers → Email_, poți dezactiva _Confirm email_, ca să nu fie nevoie de confirmare pe mail la fiecare cont de test.

Fișierele `.env` nu se urcă pe GitHub: sunt în `.gitignore`. Fiecare membru al echipei își face propriile fișiere.

## Flux de lucru Git

1. Nu se lucrează direct pe `main`. Fiecare membru are o ramură proprie, creată din issue-ul lui pe GitHub: `docs/andreas-pm`, `feature/tudor-web`, `feature/andrei-mobile`, `feature/david-backend`. Din ea deschide câte un PR pentru fiecare sarcină terminată, iar după merge continuă pe aceeași ramură (`git merge origin/main`). Pentru o sarcină mai mare se poate crea și o ramură separată din `main`: `feature/<descriere>`, `fix/<descriere>`, `chore/<descriere>` sau `docs/<descriere>`.
2. Commit-urile urmează [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add task creation form`;
   - `fix: correct overdue status at midnight`;
   - `chore: update dependencies`;
   - `docs: describe database schema`.
3. Înainte de Pull Request: `npm run lint`, `npm run typecheck`, `npm test`.
4. Pull Request în `main`, revizuit de cel puțin un coleg; fiecare sarcină are un card în Trello.

## Milestone-uri

Termenele vin din [Project Charter](docs/project-charter/Schita_ProjectCharter.md), după ședințele cursului, și sunt [milestone-uri pe GitHub](https://github.com/seba-dvd/KubiDoIt/milestones). Fiecare sarcină e un [issue](https://github.com/seba-dvd/KubiDoIt/issues) cu responsabil, iar ghidul fiecărui membru e în [docs/echipa/](docs/echipa/README.md).

| Termen     | Ședința | Conținut                                                                                                       |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| 22.10.2026 | 2       | **L1**: planificare și specificații (charter, arhitectură, schema BD, wireframe-uri, Supabase, Trello, GitHub) |
| 05.11.2026 | 3       | Punct de control: aplicația web cu adăugare / ștergere, cele 4 statusuri și autentificare (R1–R3, R5)          |
| 19.11.2026 | 4       | **L2**: aplicația web cu R1–R7, publicată pe Vercel, + documentație                                            |
| 03.12.2026 | 5       | Punct de control: aplicația mobilă cu R1–R5, conectată la același backend                                      |
| 17.12.2026 | 6       | **L3**: aplicația mobilă completă (notificări, APK) + documentație; R8 dacă timpul permite                     |
