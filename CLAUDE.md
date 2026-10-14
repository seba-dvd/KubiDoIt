# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

KubiDoIt is a to-do app built for the SOPM course at Universitatea Transilvania din Brașov. The monorepo scaffold exists (`shared/`, `web/`, `mobile/`, `supabase/`, `docs/`, `.github/`) and the R1–R3 MVP runs on both apps on local mock data (demo mode). Supabase auth/sync and R4–R8 are not wired yet. `main` is protected: changes land through PRs with 1 approval and a green `verify` CI check. The task division per milestone and person is in `docs/plan-proiect.md` (deadlines still "de stabilit"); the charter lives in `docs/project-charter/`.

### Version pins (keep them in sync)

- `react` / `react-dom` are pinned to **19.2.3 in both web and mobile** — the version Expo SDK 57 requires. Bumping React in only one app installs a second copy and breaks hooks.
- `typescript` stays on **~6.0** (npm `latest` is 7.x, but typescript-eslint supports `<6.1`).
- `react-router` stays on **7.x** (8.x exists; the README specifies 7).
- Mobile session storage uses `expo-sqlite/localStorage` (Expo's current Supabase guide), not AsyncStorage.

The user communicates primarily in Romanian. The README, commit messages, and documentation are in Romanian — match that language when writing user-facing content (UI copy, docs). Code identifiers stay in English.

## Planned architecture

Monorepo using **npm workspaces** — a single `npm install` at the root installs everything. Three workspace packages share one codebase:

- `@kubidoit/shared` (`shared/src/`) — the **single source of truth** for cross-platform logic: types, `computeStatus()` for task state, color/label maps, mock data. Both apps import from `@kubidoit/shared`. New shared logic must land here, not be duplicated in `web/` or `mobile/`.
- `@kubidoit/web` (`web/`) — React 19 + Vite + TypeScript + React Router 7. Entry pages: Login, Tasks, Stats. Supabase client at `web/src/lib/supabase.ts`.
- `@kubidoit/mobile` (`mobile/`) — React Native via Expo SDK 57 + Expo Router + React Native Paper. Screens live in `mobile/app/` as Expo Router files (tabs: Tasks, Stats, Profile). Supabase client at `mobile/lib/supabase.ts`.

Backend is **Supabase** (Postgres + Auth + Row Level Security + Realtime). SQL migrations live in `supabase/migrations/` and must be applied **in filename order**. Data isolation and multi-user group tasks rely on RLS policies — never bypass RLS by using the `service_role` key in app code (it must never appear in any file in the repo). Only the **anon**/**publishable** key is embedded in the client bundles.

### Env vars

Web uses Vite-style vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`); mobile uses Expo-style vars (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`). The two app packages each have their own `.env` (copied from `.env.example`); these are gitignored. Apps are expected to boot with no `.env` present (mock data path) during early development.

## Commands (run from repo root)

| Command              | Purpose                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm install`        | Install all workspaces (always run from root, not inside a package)                                                  |
| `npm run dev:web`    | Start Vite dev server at http://localhost:5173                                                                       |
| `npm run dev:mobile` | Start Expo dev server (press `a` for Android emulator, `w` for web preview; Expo Go on same Wi-Fi for a real device) |
| `npm run build:web`  | Production build for web                                                                                             |
| `npm test`           | Vitest unit tests (lives in `shared/`)                                                                               |
| `npm run lint`       | ESLint across the whole monorepo                                                                                     |
| `npm run typecheck`  | TypeScript check across all packages                                                                                 |
| `npm run format`     | Prettier                                                                                                             |

**Single Vitest file:** `npm test -- shared/src/path/to/file.test.ts` (or `-t "<test name>"` to filter).

**Adding deps:** web via `npm install <pkg> -w @kubidoit/web` from root. **Mobile is the exception** — `cd mobile && npx expo install <pkg>` so Expo picks a version compatible with the current SDK; do not install mobile deps with plain `npm install -w`.

**Supabase migrations:** either paste each file into the Supabase SQL Editor in filename order, or `npx supabase login && npx supabase link --project-ref <id> && npx supabase db push`.

Node **22.12+** is required (24 LTS recommended).

## Workflow conventions

- Never commit directly to `main`. Branches: `feature/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`.
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:` …). Commit subjects in English following the Conventional Commits examples in the README.
- Pre-PR gate: `npm run lint && npm run typecheck && npm test` must pass. PRs need at least one teammate review.
- Team ownership (useful when deciding who/what a change touches): web → Mituleci Tudor, mobile → Kubanda Andrei, Supabase/backend/security → Pilat David, PM/docs/testing → Nicolescu Andreas.
