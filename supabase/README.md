# supabase

Backend-ul aplicației: bază de date PostgreSQL, autentificare, API și realtime, prin Supabase.

Ce va conține:
- `migrations/` – scripturi SQL pentru tabele (activități, categorii, grupuri, membri), aplicate în ordine;
- politicile **Row Level Security** – fiecare utilizator vede doar activitățile lui și pe cele ale grupurilor din care face parte;
- `seed.sql` – date de test pentru dezvoltare.

Cheile proiectului Supabase (URL, anon key) **nu** se urcă pe GitHub; se pun în fișierele `.env` ale fiecărei aplicații.

Schema bazei de date este documentată în [`docs/database`](../docs/database).
