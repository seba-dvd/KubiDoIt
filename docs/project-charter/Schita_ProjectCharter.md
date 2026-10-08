# Project Charter – KubiDoIt

| | |
|---|---|
| **Proiect** | KubiDoIt – aplicație web și mobilă de tip listă de activități |
| **Instituție** | Universitatea Transilvania din Brașov – Facultatea de Inginerie Electrică și Știința Calculatoarelor |
| **Coordonator / Sponsor** | Corneliu Zaharia |
| **Project Manager** | Nicolescu Andreas |
| **Data** | 08.10.2026 |
| **Versiune** | 1.0 |

---

## 1. Scopul proiectului (Project purpose)

KubiDoIt este o aplicație web (React) și mobilă (React Native) de tip listă de activități, destinată atât persoanelor care vor să-și organizeze timpul, cât și grupurilor de prieteni sau familiilor care împart sarcini comune. Datele sunt sincronizate între web, Android și iOS, astfel încât utilizatorul își poate gestiona activitățile de pe orice dispozitiv.

---

## 2. Obiective măsurabile și criterii de succes

| # | Obiectiv | Criteriu de succes (măsurabil) |
|---|---|---|
| O1 | Aplicație web funcțională în React | Aplicația este publicată online și permite toate operațiile din cerințele minime |
| O2 | Aplicație mobilă funcțională în React Native | Aplicația rulează pe Android (APK / Expo Go) și iOS (Expo Go) cu aceleași funcții ca versiunea web |
| O3 | Gestionarea statusurilor activităților | Toate cele 4 statusuri (Overdue, Upcoming, Completed, Canceled) sunt afișate corect în 100% din cazurile de test |
| O4 | Sincronizare între platforme | O modificare făcută pe web apare pe mobil (și invers) în cel mult 5 secunde |
| O5 | Cerințe suplimentare | Minimum 3 cerințe suplimentare implementate și funcționale (țintă: 5) |
| O6 | Livrare la termen | Toate livrabilele sunt predate până la data prezentării finale |
| O7 | Calitate | Zero erori critice (crash, pierdere de date) la prezentarea finală |

---

## 3. Cerințe de nivel înalt (High-level requirements)

### 3.1 Cerințe minime (impuse de temă)

| ID | Cerință |
|---|---|
| R1 | Utilizatorul poate adăuga activități |
| R2 | Utilizatorul poate elimina activități |
| R3 | Activitățile pot fi marcate ca: **Overdue – Restant**, **Upcoming – Urmează**, **Completed – Complet**, **Canceled – Anulat** |

Logica statusurilor:
- **Completed** și **Canceled** – setate manual de utilizator;
- **Overdue** – termenul a trecut, iar activitatea nu este Completed sau Canceled;
- **Upcoming** – termenul nu a trecut, iar activitatea nu este Completed sau Canceled.

### 3.2 Cerințe suplimentare (stabilite în echipă)

| ID | Cerință | Descriere | Prioritate |
|---|---|---|---|
| R4 | Categorii | Fiecare activitate are o categorie (Muncă, Școală, Sală + categorii personalizate); lista poate fi filtrată și grupată pe categorii | Obligatoriu |
| R5 | Autentificare și sincronizare | Cont de utilizator (Supabase Auth); aceleași date pe web și pe mobil | Obligatoriu |
| R6 | Remindere | Activitățile marcate „Critic” generează o notificare înainte de termen (push pe mobil, notificare în browser pe web) | Obligatoriu |
| R7 | Eficiența activităților | Contor de activități finalizate (zi / săptămână), procent de completare, color coding după status | Important |
| R8 | Activități de grup | Utilizatorul creează un grup și invită membri; doar membrii grupului văd și editează activitățile comune | Opțional (dependent de timp) |

### 3.3 Unelte software

| Unealtă | Utilizare |
|---|---|
| Markdown | Documentație (README, ghiduri, charter) |
| VS Code | Editor de cod |
| TypeScript | Limbaj comun web + mobil |
| React + Vite | Aplicația web |
| React Native + Expo | Aplicația mobilă (iOS și Android) |
| CSS / bibliotecă UI web; React Native Paper | Interfața grafică |
| Supabase | Bază de date PostgreSQL, autentificare, API, realtime |
| expo-notifications | Notificări push |
| Git + GitHub | Versionare și cod comun |
| Trello | Organizarea sarcinilor echipei |
| Vercel | Publicarea aplicației web |

---

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

| # | Livrabil |
|---|---|
| L1 | Project charter (acest document) |
| L2 | Repository GitHub cu codul sursă |
| L3 | Aplicația web publicată online |
| L4 | Aplicația mobilă rulabilă prin Expo Go + fișier APK pentru Android |
| L5 | Documentație: README, ghid de instalare și utilizare, schema bazei de date |
| L6 | Prezentarea finală a proiectului |

---

## 5. Riscul general al proiectului (Overall project risk)

**Nivel general de risc: MEDIU**

| Risc | Probabilitate | Impact | Măsuri de reducere |
|---|---|---|---|
| Timp insuficient (suprapunere cu alte materii și sesiunea) | Mare | Mare | Milestone-uri intermediare; prioritizarea cerințelor; R8 este opțional |
| Experiență redusă cu React Native / Expo | Medie | Mediu | Logică comună în TypeScript; tutoriale în prima etapă; Expo simplifică testarea |
| Complexitatea activităților de grup (R8) | Mare | Mediu | Implementare ultima; poate fi scoasă din scope fără a afecta cerințele minime |
| Securitatea datelor (acces neautorizat la activitățile altor utilizatori) | Medie | Mare | Supabase Auth + Row Level Security; testarea accesului între conturi |
| Notificări diferite pe iOS / Android / web | Medie | Mic | expo-notifications pe mobil; notificările web tratate separat |
| Limitele planurilor gratuite (Supabase, Vercel) | Mică | Mediu | Volum mic de date; monitorizarea utilizării |
| Indisponibilitatea unui membru al echipei | Medie | Mediu | Cod pe GitHub, sarcini documentate în Trello, cunoștințe împărțite în echipă |

---

## 6. Calendarul milestone-urilor (Summary milestone schedule)

> **Datele sunt provizorii** și vor fi ajustate după calendarul semestrului și cerințele coordonatorului.

| Milestone | Conținut | Termen |
|---|---|---|
| M0 | Project charter aprobat | 15.10.2026 |
| M1 | Setup: repository GitHub, proiect Supabase, schema BD, board Trello, schițe UI | 25.10.2026 |
| M2 | MVP: adăugare / ștergere activități + cele 4 statusuri pe web și mobil (R1–R3) | 15.11.2026 |
| M3 | Autentificare, sincronizare și categorii (R4, R5) | 29.11.2026 |
| M4 | Remindere și statistici de eficiență (R6, R7) | 13.12.2026 |
| M5 | Activități de grup (R8) | 10.01.2027 |
| M6 | Testare finală, publicare, documentație completă | 17.01.2027 |
| M7 | Prezentarea finală | [data prezentării] |

---

## 7. Resurse financiare preaprobate (Preapproved financial resources)

**Buget total: 0 lei.** Proiectul folosește exclusiv unelte gratuite sau planurile gratuite ale serviciilor:

| Serviciu | Plan | Cost |
|---|---|---|
| Supabase | Free | 0 lei |
| Vercel | Hobby (Free) | 0 lei |
| Expo / Expo Go | Free | 0 lei |
| GitHub | Free | 0 lei |
| Trello | Free | 0 lei |
| VS Code | Gratuit | 0 lei |

Costurile neaprobate (în afara proiectului): cont Apple Developer, cont Google Play Developer, planuri plătite ale serviciilor. Orice cheltuială necesită aprobarea coordonatorului.

---

## 8. Părțile interesate cheie (Key stakeholder list)

| Parte interesată | Rol | Interes / Implicare |
|---|---|---|
| Corneliu Zaharia | Coordonator / Sponsor | Aprobă charter-ul, evaluează și acceptă proiectul |
| Nicolescu Andreas | Project Manager | Planificare, coordonare, raportare |
| Mituleci Tudor | Dezvoltator Frontend Web | Aplicația React |
| Kubanda Andrei | Dezvoltator Mobil | Aplicația React Native |
| Pilat David | Dezvoltator Backend | Supabase, securitate, sincronizare |
| Utilizatori individuali | Utilizatori finali | Organizarea timpului personal |
| Grupuri de prieteni / familii | Utilizatori finali | Gestionarea sarcinilor comune |

---

## 9. Cerințe de aprobare (Project approval requirements)

- **Ce înseamnă succesul proiectului:** cerințele minime R1–R3 și cel puțin 3 cerințe suplimentare sunt funcționale pe web și pe mobil, livrabilele L1–L6 sunt predate la termen, iar obiectivele O1–O7 sunt îndeplinite.
- **Cine decide dacă proiectul are succes:** coordonatorul, Corneliu Zaharia, pe baza prezentării finale și a demonstrației practice.
- **Cine semnează închiderea proiectului:** Corneliu Zaharia.

---

## 10. Criterii de ieșire (Project exit criteria)

**Închiderea proiectului:**
- Toate livrabilele (L1–L6) au fost predate;
- Aplicațiile au fost demonstrate în cadrul prezentării finale;
- Coordonatorul a acceptat proiectul.

**Închiderea unei etape:** milestone-ul este considerat încheiat când funcțiile asociate sunt implementate, testate și integrate în ramura principală din GitHub.

**Anularea proiectului:**
- Decizia coordonatorului;
- Imposibilitatea de a îndeplini cerințele minime (R1–R3) până la termenul final.

---

## 11. Project Manager – responsabilitate și nivel de autoritate

**Project Manager:** Nicolescu Andreas

**Responsabilități:**
- Planificarea și urmărirea milestone-urilor;
- Împărțirea sarcinilor și gestionarea board-ului Trello;
- Organizarea întâlnirilor de echipă;
- Comunicarea cu coordonatorul și raportarea progresului;
- Coordonarea documentației și a prezentării finale;
- Contribuție tehnică (testare și dezvoltare).

**Nivel de autoritate:**
- Poate atribui sarcini membrilor echipei și stabili termene interne;
- Poate reprioritiza cerințele suplimentare și poate scoate R8 din scope, cu acordul echipei;
- Nu poate modifica cerințele minime (R1–R3) sau bugetul fără aprobarea coordonatorului;
- Escaladează la coordonator problemele care pun în pericol termenul final.

---

## 12. Sponsorul / persoana care autorizează proiectul

| | |
|---|---|
| **Nume** | Corneliu Zaharia |
| **Rol** | Coordonatorul proiectului |
| **Autoritate** | Aprobă project charter-ul, aprobă modificările de scope și buget, evaluează și acceptă proiectul final |

---

## Semnături

| Rol | Nume | Semnătură | Data |
|---|---|---|---|
| Sponsor / Coordonator | Corneliu Zaharia | | |
| Project Manager | Nicolescu Andreas | | |