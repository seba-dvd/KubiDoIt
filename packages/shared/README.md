# packages/shared

Cod TypeScript comun pentru aplicația web (`apps/web`) și cea mobilă (`apps/mobile`), ca logica să fie scrisă o singură dată.

Ce va conține:
- **Tipuri** – `Task`, `Category`, `Group` etc., aliniate cu tabelele din Supabase;
- **Logica statusurilor (R3)**:
  - `Completed` și `Canceled` – setate manual de utilizator;
  - `Overdue` – termenul a trecut și activitatea nu este Completed sau Canceled;
  - `Upcoming` – termenul nu a trecut și activitatea nu este Completed sau Canceled;
- **Categorii implicite (R4)** – Muncă, Școală, Sală;
- **Calculul statisticilor (R7)** – activități finalizate pe zi / săptămână, procent de completare.

Codul sursă se pune în `src/`.
