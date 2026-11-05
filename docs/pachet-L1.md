# Pachetul L1 – planificare și specificații de proiectare

Responsabil: Nicolescu Andreas. Termen: ședința 2 (22.10.2026), depășit. Livrabilul L1 conține, conform charter-ului: project charter, specificații de proiectare (arhitectură, schema bazei de date, wireframe-uri UI, cazuri de utilizare), board Trello, repository GitHub.

## Lista de verificare

| #   | Element                      | Fișier / link                                       | Issue | Responsabil | Stare                                     |
| --- | ---------------------------- | --------------------------------------------------- | ----- | ----------- | ----------------------------------------- |
| 1   | Project Charter (PDF semnat) | `docs/project-charter/Project_Charter_KubiDoIt.pdf` | #16   | Andreas     | de semnat (tabelul de semnături e gol)    |
| 2   | Arhitectura                  | [arhitectura.md](arhitectura.md)                    | #7    | David       | scris; de aprobat în PR                   |
| 3   | Schema bazei de date         | [schema-bd.md](schema-bd.md)                        | #7    | David       | scris; testul RLS a trecut la 03.11       |
| 4   | Cazuri de utilizare          | [cazuri-de-utilizare.md](cazuri-de-utilizare.md)    | #9    | Andreas     | scris; de pus în `main`                   |
| 5   | Wireframe-uri web            | `docs/wireframes/web/`                              | #10   | Tudor       | de verificat                              |
| 6   | Wireframe-uri mobil          | `docs/wireframes/mobile/`                           | #11   | Andrei      | de verificat                              |
| 7   | Board Trello                 | link: _de completat_                                | #8    | Andreas     | de creat / partajat                       |
| 8   | Repository GitHub            | https://github.com/seba-dvd/KubiDoIt (privat)       | #16   | David       | există; coordonatorul are nevoie de acces |
| 9   | Plan de proiect              | [plan-proiect.md](plan-proiect.md)                  | –     | Andreas     | scris                                     |
| 10  | Proiect Supabase creat       | schema-bd.md, „Rezultate”                           | #6    | David       | făcut (testat la 03.11.2026)              |

Pachetul se poate preda când rândurile 1–8 sunt complete.

## Pași pentru #16

1. **#9:** pune `docs/cazuri-de-utilizare.md` în `main` printr-un PR din `docs/andreas-pm` (`Closes #9`). Rulează `npm run format` înainte, pentru că Prettier verifică și Markdown-ul.
2. **#8:** creează board-ul Trello (liste: Backlog, To Do, In Progress, Review, Done; etichete R1–R8 și web / mobil / backend / docs; un card pentru fiecare issue, cu link GitHub). Partajează-l cu echipa și cu coordonatorul. Trece link-ul în rândul 7.
3. **#7:** revizuiește `schema-bd.md` și `arhitectura.md` cu David (vezi observațiile de mai jos).
4. **#10, #11:** confirmă cu Tudor și Andrei că wireframe-urile sunt în `main`.
5. **Accesul coordonatorului:** repository-ul e privat. Cere-i lui David să-l invite pe Corneliu Zaharia (sau, alternativ, exportați documentele în PDF).
6. **Charter:** tabelul de semnături din transcrierea Markdown e gol. PDF-ul semnat este referința, deci semnează-l tu și coordonatorul, apoi pune PDF-ul în `docs/project-charter/`.
7. **Predarea:** trimite coordonatorului link-urile (GitHub, Trello) și PDF-ul charter-ului, apoi închide #16 și mută cardul în _Done_.

## Observații pentru revizuirea #7

Găsite la citirea documentelor; de discutat cu David.

| Document           | Observație                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `echipa/README.md` | Spune că review-ul e „recomandat, nu obligatoriu”, dar ghidurile lui Tudor, Andrei și David îl cer. De uniformizat (propun: obligatoriu). |
| `plan-proiect.md`  | M3.6 (Realtime) depinde de M3.5 (mobil), deci O4 nu se poate măsura la L2 (19.11). De notat explicit în plan.                             |
| `arhitectura.md`   | Reîmprospătarea statusurilor la ~30 s e un detaliu de implementare; e acoperită acum de TC-R3-13 din planul de testare.                   |
| `schema-bd.md`     | Lipsește o listă a migrațiilor aplicate (M6.5 o cere la final); poate fi adăugată acum, cu o singură migrație.                            |
| `andreas.md`       | #7 apare ca „așteaptă după #6”, dar schema-bd.md arată proiectul Supabase funcțional din 03.11; de actualizat ghidul.                     |

> Verifică fiecare observație în fișierele reale înainte de PR; sunt scrise după documentele primite, nu după repository.

## Mesaje gata de trimis

**Către David:**

> Salut David, pentru L1 am nevoie de două lucruri: (1) să-l inviți pe Corneliu Zaharia în repository-ul privat, ca să poată vedea documentele; (2) o oră în care să trecem împreună prin `schema-bd.md` și `arhitectura.md` (#7). Proiectul Supabase pare gata (testul RLS a trecut la 03.11), deci nu mai aștept după #6.

**Către Tudor și Andrei:**

> Salut, wireframe-urile (#10 web, #11 mobil) sunt ultimele piese care blochează pachetul L1, termenul din 22.10 a trecut. Le puteți pune în `docs/wireframes/web/` și `docs/wireframes/mobile/` până vineri? Dacă sunt deja în `main`, spuneți-mi și le bifez.

**Către toată echipa (re-planificare):**

> Două modificări de plan: (1) testul de sincronizare O4 (#58) depinde de Realtime (#28), programat pe 03.12, deci îl măsurăm după acea dată, iar restul testelor e2e rămân pentru 19.11; (2) review-ul unui coleg devine obligatoriu pentru orice PR, ca să fie la fel în toate ghidurile.
