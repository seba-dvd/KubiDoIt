# Pachetul L1 – planificare și specificații de proiectare

Responsabil: Pilat David (Project Manager). Prima variantă a acestei liste a scris-o Nicolescu Andreas. Termen: ședința 2 (22.10.2026), depășit. Livrabilul L1 conține, conform charter-ului: project charter, specificații de proiectare (arhitectură, schema bazei de date, wireframe-uri UI, cazuri de utilizare), board Trello, repository GitHub.

## Lista de verificare

| #   | Element                      | Fișier / link                                       | Issue | Responsabil | Stare                                                                       |
| --- | ---------------------------- | --------------------------------------------------- | ----- | ----------- | --------------------------------------------------------------------------- |
| 1   | Project Charter (PDF semnat) | `docs/project-charter/Project_Charter_KubiDoIt.pdf` | #16   | David       | de re-exportat din transcrierea v1.1 și de semnat                           |
| 2   | Arhitectura                  | [arhitectura.md](arhitectura.md)                    | #7    | David       | verificat cu proiectul real (19.11.2026)                                    |
| 3   | Schema bazei de date         | [schema-bd.md](schema-bd.md)                        | #7    | David       | verificat cu baza reală (19.11.2026); testul RLS a trecut la 03.11 și 19.11 |
| 4   | Cazuri de utilizare          | [user-cases.md](user-cases.md)                      | #9    | Andreas     | în `main` (PR #69)                                                          |
| 5   | Wireframe-uri web            | `docs/wireframes/web/`                              | #10   | Tudor       | în `main`                                                                   |
| 6   | Wireframe-uri mobil          | `docs/wireframes/mobile/`                           | #11   | Andrei      | în `main`                                                                   |
| 7   | Board Trello                 | link: _de completat_                                | #8    | David       | de creat / partajat                                                         |
| 8   | Repository GitHub            | https://github.com/seba-dvd/KubiDoIt (privat)       | #16   | David       | există; coordonatorul are nevoie de acces                                   |
| 9   | Plan de proiect              | [plan-proiect.md](plan-proiect.md)                  | –     | David       | scris                                                                       |
| 10  | Proiect Supabase creat       | schema-bd.md, „Rezultate”                           | #6    | David       | făcut (testat la 03.11.2026)                                                |
| 11  | User stories                 | [user-stories.md](user-stories.md)                  | #70   | David       | scris                                                                       |
| 12  | Specificații tehnice (PDF)   | `docs/livrabile/KubiDoIt_Specificatii_Tehnice.pdf`  | –     | David       | generat din rândurile 2–6 și 11 + planul de testare                         |

Pachetul se poate preda când rândurile 1–8 sunt complete. User stories (rândul 11) și documentul de specificații (rândul 12) au fost cerute ulterior de coordonator. Documentul adună arhitectura, schema bazei de date, wireframe-urile, cazurile de utilizare, user stories și planul de testare într-un singur PDF; charter-ul se trimite separat.

## Pași pentru #16

1. **#9:** gata, cazurile de utilizare sunt în `main` (PR #69).
2. **#8:** creează board-ul Trello (liste: Backlog, To Do, In Progress, Review, Done; etichete R1–R8 și web / mobil / backend / docs; un card pentru fiecare issue, cu link GitHub). Partajează-l cu echipa și cu coordonatorul. Trece link-ul în rândul 7.
3. **#7:** revizuiește `schema-bd.md` și `arhitectura.md` împreună cu Andreas (vezi observațiile de mai jos).
4. **#10, #11:** gata, wireframe-urile sunt în `main`.
5. **Accesul coordonatorului:** repository-ul e privat. Invită-l pe Corneliu Zaharia ca colaborator (sau, alternativ, exportă documentele în PDF).
6. **Charter:** transcrierea Markdown e la versiunea 1.1, cu tine ca PM. Re-exportă PDF-ul din ea, semnați-l tu și coordonatorul, apoi pune PDF-ul semnat în `docs/project-charter/`, în locul celui vechi.
7. **Predarea:** trimite coordonatorului link-urile (GitHub, Trello) și PDF-ul charter-ului, apoi închide #16 și mută cardul în _Done_.

## Observații pentru revizuirea #7

Găsite de Andreas la citirea documentelor. Toate sunt rezolvate (19.11.2026), după compararea documentelor cu baza reală.

| Document           | Observație                                                                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `echipa/README.md` | Spunea că review-ul e „recomandat, nu obligatoriu”, iar alte ghiduri îl cereau. **Rezolvat (09.11.2026):** review-ul e la cerere, la fel în toate ghidurile.   |
| `plan-proiect.md`  | M3.6 (Realtime) depinde de M3.5 (mobil), deci O4 nu se poate măsura la L2 (19.11). **Rezolvat:** notat în plan, sub tabelul M3.                                |
| `arhitectura.md`   | Reîmprospătarea statusurilor la ~30 s e un detaliu de implementare. **Păstrat:** e o decizie de arhitectură (statusul depinde de oră), verificată de TC-R3-13. |
| `schema-bd.md`     | Lipsea o listă a migrațiilor aplicate. **Rezolvat:** secțiunea „Migrațiile aplicate” (#38).                                                                    |
| `andreas.md`       | #7 apare ca „așteaptă după #6”. **Nu e nevoie de schimbare:** coloana arată dependențele, iar #6 e terminat din 03.11.                                         |

## Mesaje gata de trimis

**Către toată echipa (re-planificare):**

> Două modificări de plan: (1) testul de sincronizare O4 (#58) depinde de Realtime (#28), programat pe 03.12, deci îl măsurăm după acea dată, iar restul testelor e2e rămân pentru 19.11; (2) review-ul e la cerere: vă îmbinați singuri PR-urile după ce CI-ul `verify` e verde, iar dacă vreți o a doua părere mă adăugați pe mine ca revizor.

**Către coordonator (la predare):**

> Bună ziua, vă trimit pachetul L1 al proiectului KubiDoIt: documentul de specificații tehnice (arhitectură, schema bazei de date, wireframe-uri, cazuri de utilizare, user stories, plan de testare), project charter-ul (versiunea 1.1), board-ul Trello și repository-ul GitHub, la care v-am trimis invitație.
