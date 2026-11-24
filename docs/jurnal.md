# Jurnal – KubiDoIt

## 2026-11-24 — Primul context salvat și evaluarea stării

**Obiectiv:** să notez unde e proiectul față de plan și ce trebuie corectat întâi.
**Făcut:**

- Am comparat codul de pe `main` (v1.6.0) cu `docs/plan-proiect.md` → R1–R3 merg pe web și mobil, dar pe date mock; autentificarea și sincronizarea (R5) nu sunt legate.
- Am verificat folosirea API-ului din `shared/src/api/` → nu e apelat nicăieri în `web/src` sau `mobile/app`.
- Am verificat CI-ul → `verify` rulează lint, typecheck, teste și format; deploy-ul pe Vercel nu așteaptă `verify`.

**A picat / abandonat:**

- Termenele din 05.11 (autentificare) și 19.11 (L2) — depășite; întârzierea nu e notată în plan.

**Decizii:** niciuna nouă.
**Următorul pas:** legarea web-ului de Supabase în `TasksProvider.tsx` (autentificare + `listTasks/createTask/deleteTask/setTaskStatus`).
**Conversație:** —
