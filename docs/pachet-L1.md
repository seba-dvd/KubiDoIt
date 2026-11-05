# Pachetul L1 – planificare și specificații de proiectare

Responsabil: Pilat David (Project Manager). Prima variantă a acestei liste a scris-o Nicolescu Andreas. Termen: ședința 2 (22.10.2026), depășit. Livrabilul L1 conține, conform charter-ului: project charter, specificații de proiectare (arhitectură, schema bazei de date, wireframe-uri UI, cazuri de utilizare), board Trello, repository GitHub.

## Lista de verificare

| #   | Element                      | Fișier / link                                       | Issue | Responsabil | Stare                                             |
| --- | ---------------------------- | --------------------------------------------------- | ----- | ----------- | ------------------------------------------------- |
| 1   | Project Charter (PDF semnat) | `docs/project-charter/Project_Charter_KubiDoIt.pdf` | #16   | David       | de re-exportat din transcrierea v1.1 și de semnat |
| 2   | Arhitectura                  | [arhitectura.md](arhitectura.md)                    | #7    | David       | scris; de aprobat în PR                           |
| 3   | Schema bazei de date         | [schema-bd.md](schema-bd.md)                        | #7    | David       | scris; testul RLS a trecut la 03.11               |
| 4   | Cazuri de utilizare          | [cazuri-de-utilizare.md](cazuri-de-utilizare.md)    | #9    | Andreas     | în `main` (PR #69)                                |
| 5   | Wireframe-uri web            | `docs/wireframes/web/`                              | #10   | Tudor       | în `main`                                         |
| 6   | Wireframe-uri mobil          | `docs/wireframes/mobile/`                           | #11   | Andrei      | în `main`                                         |
| 7   | Board Trello                 | link: _de completat_                                | #8    | David       | de creat / partajat                               |
| 8   | Repository GitHub            | https://github.com/seba-dvd/KubiDoIt (privat)       | #16   | David       | există; coordonatorul are nevoie de acces         |
| 9   | Plan de proiect              | [plan-proiect.md](plan-proiect.md)                  | –     | David       | scris                                             |
| 10  | Proiect Supabase creat       | schema-bd.md, „Rezultate”                           | #6    | David       | făcut (testat la 03.11.2026)                      |
| 11  | User stories                 | `docs/user-stories.md`                              | #70   | Andreas     | de scris (termen L2, 19.11)                       |

Pachetul se poate preda când rândurile 1–8 sunt complete. User stories (rândul 11) au fost cerute ulterior de coordonator și se trimit când sunt gata.

## Pași pentru #16

1. **#9:** gata, cazurile de utilizare sunt în `main` (PR #69).
2. **#8:** creează board-ul Trello (liste: Backlog, To Do, In Progress, Review, Done; etichete R1–R8 și web / mobil / backend / docs; un card pentru fiecare issue, cu link GitHub). Partajează-l cu echipa și cu coordonatorul. Trece link-ul în rândul 7.
3. **#7:** revizuiește `schema-bd.md` și `arhitectura.md` împreună cu Andreas (vezi observațiile de mai jos).
4. **#10, #11:** gata, wireframe-urile sunt în `main`.
5. **Accesul coordonatorului:** repository-ul e privat. Invită-l pe Corneliu Zaharia ca colaborator (sau, alternativ, exportă documentele în PDF).
6. **Charter:** transcrierea Markdown e la versiunea 1.1, cu tine ca PM. Re-exportă PDF-ul din ea, semnați-l tu și coordonatorul, apoi pune PDF-ul semnat în `docs/project-charter/`, în locul celui vechi.
7. **Predarea:** trimite coordonatorului link-urile (GitHub, Trello) și PDF-ul charter-ului, apoi închide #16 și mută cardul în _Done_.

## Observații pentru revizuirea #7

Găsite de Andreas la citirea documentelor; de rezolvat împreună în #7.

| Document           | Observație                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `echipa/README.md` | Spune că review-ul e „recomandat, nu obligatoriu”, dar ghidurile lui Tudor, Andrei și David îl cer. De uniformizat (propun: obligatoriu). |
| `plan-proiect.md`  | M3.6 (Realtime) depinde de M3.5 (mobil), deci O4 nu se poate măsura la L2 (19.11). De notat explicit în plan.                             |
| `arhitectura.md`   | Reîmprospătarea statusurilor la ~30 s e un detaliu de implementare; e acoperită acum de TC-R3-13 din planul de testare.                   |
| `schema-bd.md`     | Lipsește o listă a migrațiilor aplicate (M6.5 o cere la final); poate fi adăugată acum, cu o singură migrație.                            |
| `andreas.md`       | #7 apare ca „așteaptă după #6”, dar schema-bd.md arată proiectul Supabase funcțional din 03.11; de actualizat ghidul.                     |

> Verifică fiecare observație în fișierele reale înainte de PR; sunt scrise după documentele primite, nu după repository.

## Mesaje gata de trimis

**Către toată echipa (re-planificare):**

> Două modificări de plan: (1) testul de sincronizare O4 (#58) depinde de Realtime (#28), programat pe 03.12, deci îl măsurăm după acea dată, iar restul testelor e2e rămân pentru 19.11; (2) review-ul unui coleg devine obligatoriu pentru orice PR, ca să fie la fel în toate ghidurile.

**Către coordonator (la predare):**

> Bună ziua, vă trimit pachetul L1 al proiectului KubiDoIt: charter-ul (versiunea 1.1), specificațiile de proiectare din repository (arhitectură, schema bazei de date, cazuri de utilizare, wireframe-uri), board-ul Trello și repository-ul GitHub, la care v-am trimis invitație. User stories urmează până la ședința 4 (19.11).
