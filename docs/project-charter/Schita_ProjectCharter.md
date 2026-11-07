# Project Charter – KubiDoIt

> Transcriere Markdown a documentului [Project_Charter_KubiDoIt.pdf](Project_Charter_KubiDoIt.pdf). PDF-ul din repository e încă la versiunea 1.0 și se re-exportă din această transcriere (versiunea 1.1, vezi [Istoricul versiunilor](#istoricul-versiunilor)) înainte de semnare. După semnare, PDF-ul semnat este referința.

|                           |                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Proiect**               | KubiDoIt – aplicație web și mobilă de tip listă de activități                                        |
| **Instituție**            | Universitatea Transilvania din Brașov – Facultatea de Inginerie Electrică și Știința Calculatoarelor |
| **Coordonator / Sponsor** | Corneliu Zaharia                                                                                     |
| **Project Manager**       | Pilat David                                                                                          |
| **Data**                  | 08.10.2026                                                                                           |
| **Versiune**              | 1.1 (05.11.2026)                                                                                     |

## 1. Scopul proiectului (Project purpose)

KubiDoIt este o aplicație web (React) și mobilă (React Native) de tip listă de activități, destinată atât persoanelor care vor să-și organizeze timpul, cât și grupurilor de prieteni sau familiilor care împart sarcini comune. Datele sunt sincronizate între web, Android și iOS, astfel încât utilizatorul își poate gestiona activitățile de pe orice dispozitiv.

## 2. Obiective măsurabile și criterii de succes

| #   | Obiectiv                                     | Criteriu de succes (măsurabil)                                                                                   |
| --- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| O1  | Aplicație web funcțională în React           | Aplicația este publicată online și permite toate operațiile din cerințele minime                                 |
| O2  | Aplicație mobilă funcțională în React Native | Aplicația rulează pe Android (APK / Expo Go) și iOS (Expo Go) cu aceleași funcții ca versiunea web               |
| O3  | Gestionarea statusurilor activităților       | Toate cele 4 statusuri (Overdue, Upcoming, Completed, Canceled) sunt afișate corect în 100% din cazurile de test |
| O4  | Sincronizare între platforme                 | O modificare făcută pe web apare pe mobil (și invers) în cel mult 5 secunde                                      |
| O5  | Cerințe suplimentare                         | Minimum 3 cerințe suplimentare implementate și funcționale (țintă: 5)                                            |
| O6  | Livrare la termen                            | Livrabilele L1, L2 și L3 sunt predate la ședințele 2, 4 și, respectiv, 6                                         |
| O7  | Calitate                                     | Zero erori critice (crash, pierdere de date) la demonstrațiile de la ședințele 4 și 6                            |

## 3. Cerințe de nivel înalt (High-level requirements)

### 3.1 Cerințe minime (impuse de temă)

| ID  | Cerință                                                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------------------------------- |
| R1  | Utilizatorul poate adăuga activități                                                                                          |
| R2  | Utilizatorul poate elimina activități                                                                                         |
| R3  | Activitățile pot fi marcate ca: **Overdue – Restant**, **Upcoming – Urmează**, **Completed – Complet**, **Canceled – Anulat** |

Logica statusurilor:

- **Completed** și **Canceled** – setate manual de utilizator;
- **Overdue** – termenul a trecut, iar activitatea nu este Completed sau Canceled;
- **Upcoming** – termenul nu a trecut, iar activitatea nu este Completed sau Canceled.

### 3.2 Cerințe suplimentare (stabilite în echipă)

| ID  | Cerință                       | Descriere                                                                                                                           | Prioritate                   |
| --- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| R4  | Categorii                     | Fiecare activitate are o categorie (Muncă, Școală, Sală + categorii personalizate); lista poate fi filtrată și grupată pe categorii | Obligatoriu                  |
| R5  | Autentificare și sincronizare | Cont de utilizator (Supabase Auth); aceleași date pe web și pe mobil                                                                | Obligatoriu                  |
| R6  | Remindere                     | Activitățile marcate „Critic” generează o notificare înainte de termen (push pe mobil, notificare în browser pe web)                | Obligatoriu                  |
| R7  | Eficiența activităților       | Contor de activități finalizate (zi / săptămână), procent de completare, color coding după status                                   | Important                    |
| R8  | Activități de grup            | Utilizatorul creează un grup și invită membri; doar membrii grupului văd și editează activitățile comune                            | Opțional (dependent de timp) |

### 3.3 Unelte software

| Unealtă                                     | Utilizare                                             |
| ------------------------------------------- | ----------------------------------------------------- |
| Markdown                                    | Documentație (README, ghiduri, charter)               |
| VS Code                                     | Editor de cod                                         |
| TypeScript                                  | Limbaj comun web + mobil                              |
| React + Vite                                | Aplicația web                                         |
| React Native + Expo                         | Aplicația mobilă (iOS și Android)                     |
| CSS / bibliotecă UI web; React Native Paper | Interfața grafică                                     |
| Supabase                                    | Bază de date PostgreSQL, autentificare, API, realtime |
| expo-notifications                          | Notificări push                                       |
| Git + GitHub                                | Versionare și cod comun                               |
| Trello                                      | Organizarea sarcinilor echipei                        |
| Vercel                                      | Publicarea aplicației web                             |

## 4. Descrierea proiectului, limite și livrabile

### 4.1 Descriere

Proiectul constă în dezvoltarea a două aplicații client (web și mobil) care folosesc un backend comun (Supabase). Aplicațiile permit crearea, organizarea și urmărirea activităților personale și de grup.

### 4.2 În afara proiectului (Out of scope)

- Publicarea în App Store / Google Play (testarea se face prin Expo Go / APK);
- Mod offline complet;
- Chat între membrii unui grup;
- Integrare cu Google Calendar sau alte calendare externe;
- Panou de administrare.

### 4.3 Livrabile principale

| #   | Livrabil                                             | Conținut                                                                                                                                                | Termen    |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| L1  | Planificarea proiectului; specificații de proiectare | Project charter, specificații de proiectare (arhitectură, schema bazei de date, wireframe-uri UI, cazuri de utilizare), board Trello, repository GitHub | Ședința 2 |
| L2  | Implementare React; documentație                     | Aplicația web publicată online, cod sursă pe GitHub, documentația aplicației web (README, ghid de instalare și utilizare)                               | Ședința 4 |
| L3  | Implementare React Native; documentație              | Aplicația mobilă rulabilă prin Expo Go + APK Android, cod sursă pe GitHub, documentația aplicației mobile                                               | Ședința 6 |

## 5. Riscul general al proiectului (Overall project risk)

**Nivel general de risc: MEDIU**

| Risc                                                                      | Probabilitate | Impact | Măsuri de reducere                                                                                |
| ------------------------------------------------------------------------- | ------------- | ------ | ------------------------------------------------------------------------------------------------- |
| Timp scurt pentru implementarea web (ședința 2 → ședința 4)               | Mare          | Mare   | Backend-ul Supabase pregătit din etapa de planificare; prioritizarea cerințelor; R8 este opțional |
| Timp insuficient (suprapunere cu alte materii)                            | Mare          | Mare   | Puncte de control interne la ședințele 3 și 5; sarcini urmărite în Trello                         |
| Experiență redusă cu React Native / Expo                                  | Medie         | Mediu  | Logică comună în TypeScript; tutoriale în prima etapă; Expo simplifică testarea                   |
| Complexitatea activităților de grup (R8)                                  | Mare          | Mediu  | Implementare ultima; poate fi scoasă din scope fără a afecta cerințele minime                     |
| Securitatea datelor (acces neautorizat la activitățile altor utilizatori) | Medie         | Mare   | Supabase Auth + Row Level Security; testarea accesului între conturi                              |
| Notificări diferite pe iOS / Android / web                                | Medie         | Mic    | expo-notifications pe mobil; notificările web tratate separat                                     |
| Limitele planurilor gratuite (Supabase, Vercel)                           | Mică          | Mediu  | Volum mic de date; monitorizarea utilizării                                                       |
| Indisponibilitatea unui membru al echipei                                 | Medie         | Mediu  | Cod pe GitHub, sarcini documentate în Trello, cunoștințe împărțite în echipă                      |

## 6. Calendarul milestone-urilor (Summary milestone schedule)

Termenele sunt stabilite pe ședințele de proiect. Datele sunt **estimative** (ședințe la 2 săptămâni, începând cu 08.10.2026).

| Milestone        | Ședința   | Conținut                                                                                                                                                             | Dată estimată |
| ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| M0               | Ședința 1 | Lansare: temă primită, echipă formată                                                                                                                                | 08.10.2026    |
| M1 – Livrabil L1 | Ședința 2 | **Planificarea proiectului; specificații de proiectare.** Charter, arhitectură, schema BD, wireframe-uri UI, proiect Supabase creat, board Trello, repository GitHub | 22.10.2026    |
| M2               | Ședința 3 | Punct de control intern: aplicația web cu adăugare / ștergere activități, cele 4 statusuri și autentificare (R1–R3, R5)                                              | 05.11.2026    |
| M3 – Livrabil L2 | Ședința 4 | **Implementare React; documentație.** Aplicația web cu R1–R7 (R8 dacă timpul permite), publicată pe Vercel + documentație                                            | 19.11.2026    |
| M4               | Ședința 5 | Punct de control intern: aplicația mobilă cu R1–R5, conectată la același backend                                                                                     | 03.12.2026    |
| M5 – Livrabil L3 | Ședința 6 | **Implementare React Native; documentație.** Aplicația mobilă cu toate funcțiile, notificări push, APK + documentație                                                | 17.12.2026    |

**Organizarea echipei pe etape:** până la ședința 4, accentul este pe aplicația web și backend (dezvoltatorul mobil lucrează la logica comună și pregătește proiectul Expo). După ședința 4, accentul trece pe aplicația mobilă (dezvoltatorul web ajută la UI-ul mobil). Backend-ul și logica de status sunt refolosite de ambele aplicații.

## 7. Resurse financiare preaprobate (Preapproved financial resources)

**Buget total: 0 lei.** Proiectul folosește exclusiv unelte gratuite sau planurile gratuite ale serviciilor:

| Serviciu       | Plan         | Cost  |
| -------------- | ------------ | ----- |
| Supabase       | Free         | 0 lei |
| Vercel         | Hobby (Free) | 0 lei |
| Expo / Expo Go | Free         | 0 lei |
| GitHub         | Free         | 0 lei |
| Trello         | Free         | 0 lei |
| VS Code        | Gratuit      | 0 lei |

Costurile neaprobate (în afara proiectului): cont Apple Developer, cont Google Play Developer, planuri plătite ale serviciilor. Orice cheltuială necesită aprobarea coordonatorului.

## 8. Părțile interesate cheie (Key stakeholder list)

| Parte interesată              | Rol                                    | Interes / Implicare                                                    |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| Corneliu Zaharia              | Coordonator / Sponsor                  | Aprobă charter-ul, evaluează și acceptă proiectul                      |
| Nicolescu Andreas             | QA Lead și analist de cerințe          | Cerințe (cazuri de utilizare, user stories), testare, calitate         |
| Mituleci Tudor                | Dezvoltator Frontend Web               | Aplicația React                                                        |
| Kubanda Andrei                | Dezvoltator Mobil                      | Aplicația React Native                                                 |
| Pilat David                   | Project Manager și Dezvoltator Backend | Planificare, coordonare, raportare; Supabase, securitate, sincronizare |
| Utilizatori individuali       | Utilizatori finali                     | Organizarea timpului personal                                          |
| Grupuri de prieteni / familii | Utilizatori finali                     | Gestionarea sarcinilor comune                                          |

## 9. Cerințe de aprobare (Project approval requirements)

- **Ce înseamnă succesul proiectului:** cerințele minime R1–R3 și cel puțin 3 cerințe suplimentare sunt funcționale pe web și pe mobil, livrabilele L1–L3 sunt predate la ședințele stabilite, iar obiectivele O1–O7 sunt îndeplinite.
- **Cine decide dacă proiectul are succes:** coordonatorul, Corneliu Zaharia, pe baza demonstrațiilor practice de la ședințele 4 și 6.
- **Cine semnează închiderea proiectului:** Corneliu Zaharia.

## 10. Criterii de ieșire (Project exit criteria)

**Închiderea proiectului:**

- Toate livrabilele (L1–L3) au fost predate;
- Ambele aplicații au fost demonstrate coordonatorului;
- Coordonatorul a acceptat proiectul.

**Închiderea unei etape:** milestone-ul este considerat încheiat când funcțiile asociate sunt implementate, testate și integrate în ramura principală din GitHub.

**Anularea proiectului:**

- Decizia coordonatorului;
- Imposibilitatea de a îndeplini cerințele minime (R1–R3) până la termenul final.

## 11. Project Manager – responsabilitate și nivel de autoritate

**Project Manager:** Pilat David

**Responsabilități:**

- Planificarea și urmărirea milestone-urilor;
- Împărțirea sarcinilor și gestionarea board-ului Trello;
- Organizarea întâlnirilor de echipă;
- Comunicarea cu coordonatorul și raportarea progresului;
- Coordonarea documentației și a prezentării finale;
- Contribuție tehnică (dezvoltarea backend-ului: Supabase, securitate, sincronizare).

**Nivel de autoritate:**

- Poate atribui sarcini membrilor echipei și stabili termene interne;
- Poate reprioritiza cerințele suplimentare și poate scoate R8 din scope, cu acordul echipei;
- Nu poate modifica cerințele minime (R1–R3) sau bugetul fără aprobarea coordonatorului;
- Escaladează la coordonator problemele care pun în pericol termenul final.

## 12. Sponsorul / persoana care autorizează proiectul

|                |                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **Nume**       | Corneliu Zaharia                                                                                       |
| **Rol**        | Coordonatorul proiectului                                                                              |
| **Autoritate** | Aprobă project charter-ul, aprobă modificările de scope și buget, evaluează și acceptă proiectul final |

## Semnături

| Rol                   | Nume             | Semnătură | Data |
| --------------------- | ---------------- | --------- | ---- |
| Sponsor / Coordonator | Corneliu Zaharia |           |      |
| Project Manager       | Pilat David      |           |      |

## Istoricul versiunilor

| Versiune | Data       | Modificare                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0      | 08.10.2026 | Prima versiune.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.1      | 05.11.2026 | Rolurile corectate după cum s-a lucrat de fapt, cu acordul echipei și al coordonatorului: Project Manager este Pilat David, care a condus planificarea de la începutul proiectului (planul și împărțirea sarcinilor, issue-urile și milestone-urile de pe GitHub, ghidurile echipei). Versiunea 1.0 îl trecea ca Project Manager pe Nicolescu Andreas, care apare acum ca QA Lead și analist de cerințe. Modificate: antetul, secțiunile 8 și 11 și tabelul de semnături. |
