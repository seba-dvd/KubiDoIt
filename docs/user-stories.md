# User stories

Document de specificații. Responsabil: Pilat David. User stories descriu cerințele R1–R8 din [Project Charter](project-charter/Schita_ProjectCharter.md) din perspectiva utilizatorului. Pornesc de la [cazurile de utilizare](user-cases.md), de la wireframe-urile din `docs/wireframes/` și de la regulile de date din [schema-bd.md](schema-bd.md).

## Cum se citesc

- **ID:** `US-R<cerință>-<număr>`, de exemplu `US-R2-01`.
- **Forma:** „Ca _rol_, vreau _acțiune_, ca să _beneficiu_.”
- **Prioritatea** vine din charter: _Minim_ (cerințele impuse de temă, R1–R3), _Obligatoriu_ (R4–R6), _Important_ (R7), _Opțional_ (R8).
- **Criteriile de acceptare** spun când un user story e gata. Fiecare criteriu se verifică printr-un caz de test din [planul de testare](testare/plan-de-testare.md). Coloana „Teste” arată cazurile care există deja; pentru R4–R8 cazurile se adaugă odată cu testarea acelor cerințe (M3.10, M4.7, M4.8, M5.5).

## Trasabilitate

| ID       | User story, pe scurt                                 | Cerință | Caz de utilizare | Prioritate  | Teste                                                     |
| -------- | ---------------------------------------------------- | ------- | ---------------- | ----------- | --------------------------------------------------------- |
| US-R1-01 | Adaug o activitate cu titlu și termen                | R1      | UC1              | Minim       | TC-R1-01, TC-R1-04, TC-R1-06, TC-R1-10, TC-R1-11          |
| US-R1-02 | Văd erori clare când completez greșit formularul     | R1      | UC1              | Minim       | TC-R1-02, TC-R1-03, TC-R1-05, TC-R1-07–TC-R1-09, TC-R1-12 |
| US-R2-01 | Șterg o activitate, cu confirmare                    | R2      | UC2              | Minim       | TC-R2-01–TC-R2-06                                         |
| US-R3-01 | Văd statusul calculat automat după termen            | R3      | UC3              | Minim       | TC-R3-01–TC-R3-04, TC-R3-13, TC-R3-15                     |
| US-R3-02 | Marchez o activitate Complet sau Anulat              | R3      | UC3              | Minim       | TC-R3-05–TC-R3-10, TC-R3-14                               |
| US-R3-03 | Reactivez o activitate închisă                       | R3      | UC3              | Minim       | TC-R3-11, TC-R3-12                                        |
| US-R3-04 | Filtrez lista după status                            | R3      | UC3              | Minim       | TC-R2-03 (starea goală); restul de adăugat                |
| US-R4-01 | Aleg o categorie pentru fiecare activitate           | R4      | UC4              | Obligatoriu | de adăugat                                                |
| US-R4-02 | Filtrez lista după categorie                         | R4      | UC4              | Obligatoriu | de adăugat                                                |
| US-R4-03 | Grupez lista pe categorii                            | R4      | UC4              | Obligatoriu | de adăugat                                                |
| US-R4-04 | Îmi creez și îmi șterg categoriile                   | R4      | UC4              | Obligatoriu | de adăugat                                                |
| US-R5-01 | Îmi creez un cont                                    | R5      | UC0              | Obligatoriu | de adăugat                                                |
| US-R5-02 | Mă autentific și mă deconectez                       | R5      | UC0              | Obligatoriu | de adăugat                                                |
| US-R5-03 | Activitățile mele sunt private                       | R5      | UC0–UC2          | Obligatoriu | TC-SEC-01–TC-SEC-03                                       |
| US-R5-04 | Văd aceleași date pe web și pe mobil                 | R5, O4  | UC5              | Obligatoriu | de adăugat (M3.10, M3.11)                                 |
| US-R5-05 | Încerc aplicația fără cont, în modul demo            | –       | UC0              | Important   | de adăugat                                                |
| US-R6-01 | Primesc un reminder pentru activitățile critice      | R6      | UC6              | Obligatoriu | de adăugat (M4.7, M4.8)                                   |
| US-R6-02 | Reminderul urmează schimbările activității           | R6      | UC6              | Obligatoriu | de adăugat                                                |
| US-R7-01 | Văd câte activități am finalizat azi și în săptămână | R7      | UC7              | Important   | de adăugat (M4.8)                                         |
| US-R7-02 | Văd rata de finalizare                               | R7      | UC7              | Important   | de adăugat                                                |
| US-R7-03 | Văd activitățile pe status, colorate diferit         | R7      | UC7              | Important   | TC-R3-14 (culorile); restul de adăugat                    |
| US-R8-01 | Creez un grup și invit membri                        | R8      | UC8              | Opțional    | de adăugat (M5.5)                                         |
| US-R8-02 | Intru într-un grup cu un cod de invitație            | R8      | UC8              | Opțional    | de adăugat                                                |
| US-R8-03 | Lucrez cu activitățile grupului                      | R8      | UC8              | Opțional    | de adăugat                                                |
| US-R8-04 | Părăsesc un grup                                     | R8      | UC8              | Opțional    | de adăugat                                                |

## R1 – Adăugarea activităților

### US-R1-01 – Adaug o activitate cu titlu și termen

> Ca **utilizator**, vreau să adaug o activitate cu un titlu și un termen, ca să nu uit ce am de făcut și până când.

**Prioritate:** Minim · **Caz de utilizare:** UC1 · **Teste:** TC-R1-01, TC-R1-04, TC-R1-06, TC-R1-10, TC-R1-11

Criterii de acceptare:

- Formularul „Activitate nouă” are câmpurile **titlu** și **termen** (dată și oră). Termenul are implicit valoarea „mâine, ora 12:00”.
- Pe mobil, formularul se deschide cu butonul „+” din lista de activități.
- La „Adaugă”, activitatea apare imediat în listă, cu statusul **Urmează**, sau **Restant** dacă termenul a trecut deja.
- Titlul se salvează fără spațiile de la capete. Un titlu de exact 200 de caractere este acceptat.
- După adăugare, formularul se golește, iar termenul revine la valoarea implicită.
- Pe mobil, data și ora se aleg cu selectorul nativ (Android și iOS) și apar corect în listă.

### US-R1-02 – Văd erori clare când completez greșit formularul

> Ca **utilizator**, vreau să văd imediat ce am completat greșit, ca să pot corecta fără să pierd ce am scris.

**Prioritate:** Minim · **Caz de utilizare:** UC1 · **Teste:** TC-R1-02, TC-R1-03, TC-R1-05, TC-R1-07, TC-R1-08, TC-R1-09, TC-R1-12

Criterii de acceptare:

- Un titlu gol, format doar din spații sau mai lung de 200 de caractere nu se salvează.
- O descriere mai lungă de 2000 de caractere nu se salvează.
- O activitate fără termen nu se salvează.
- Fiecare eroare apare sub câmpul la care se referă, nu într-o fereastră separată, și e legată de câmp pentru cititoarele de ecran (`aria-describedby`).
- Formularul se poate completa și trimite doar cu tastatura.
- La o eroare de rețea apare un mesaj, iar datele din formular rămân completate.

## R2 – Eliminarea activităților

### US-R2-01 – Șterg o activitate, cu confirmare

> Ca **utilizator**, vreau să șterg o activitate de care nu mai am nevoie, dar să confirm înainte, ca să nu pierd din greșeală o activitate importantă.

**Prioritate:** Minim · **Caz de utilizare:** UC2 · **Teste:** TC-R2-01–TC-R2-06

Criterii de acceptare:

- Fiecare activitate are butonul „Șterge”, care deschide dialogul „Ștergi activitatea?” cu titlul activității.
- Confirmarea în dialog șterge activitatea din listă și din baza de date. După reîncărcarea paginii, activitatea nu reapare.
- Butonul de renunțare din dialog (și tasta Escape, pe web) închide dialogul și păstrează activitatea neschimbată.
- Dacă era ultima activitate, apare starea goală „Nu ai nicio activitate încă”.
- Pe mobil, dialogul se comportă la fel ca pe web.
- Activitatea ștearsă dispare și de pe celălalt dispozitiv al utilizatorului (US-R5-04).

## R3 – Statusurile activităților

### US-R3-01 – Văd statusul calculat automat după termen

> Ca **utilizator**, vreau ca fiecare activitate să-și arate singură statusul după termen, ca să văd dintr-o privire ce am întârziat.

**Prioritate:** Minim · **Caz de utilizare:** UC3 · **Teste:** TC-R3-01–TC-R3-04, TC-R3-13, TC-R3-15

Criterii de acceptare:

- O activitate care nu e Completă sau Anulată este **Urmează** până la termen, inclusiv în momentul exact al termenului, și **Restant** după acesta.
- Statusul se actualizează singur cât timp aplicația e deschisă, în cel mult aproximativ 30 de secunde după termen, fără reîncărcarea paginii.
- Lista e ordonată după status (întâi restantele, apoi cele care urmează, la final cele complete și cele anulate) și, în cadrul aceluiași status, după cel mai apropiat termen.
- Restant și Urmează nu se salvează în baza de date. Se calculează mereu din termen, cu aceeași funcție pe web și pe mobil (`computeStatus` din `@kubidoit/shared`).

### US-R3-02 – Marchez o activitate Complet sau Anulat

> Ca **utilizator**, vreau să marchez o activitate ca terminată sau ca anulată, ca lista să arate doar ce mai am de făcut.

**Prioritate:** Minim · **Caz de utilizare:** UC3 · **Teste:** TC-R3-05–TC-R3-10, TC-R3-14

Criterii de acceptare:

- Activitățile active (Restant, Urmează) au butoanele „Complet” și „Anulează”. Pe mobil, căsuța din dreptul activității o marchează Complet, iar titlul apare tăiat.
- „Complet” schimbă statusul în **Complet**, indiferent de termen, și salvează momentul finalizării, folosit de statistici.
- „Anulează” schimbă statusul în **Anulat**, indiferent de termen.
- Activitățile închise (Complet, Anulat) apar estompate și au butonul „Reactivează”.
- Fiecare status are eticheta și culoarea lui, aceleași pe web și pe mobil.

### US-R3-03 – Reactivez o activitate închisă

> Ca **utilizator**, vreau să redeschid o activitate marcată din greșeală ca Completă sau Anulată, ca să o am din nou în lista de făcut.

**Prioritate:** Minim · **Caz de utilizare:** UC3 · **Teste:** TC-R3-11, TC-R3-12

Criterii de acceptare:

- „Reactivează” șterge statusul manual, iar statusul se recalculează după termen: **Urmează** dacă termenul e în viitor, **Restant** dacă a trecut.
- O activitate reactivată nu mai contează ca finalizată în statistici, pentru că momentul finalizării se șterge.

### US-R3-04 – Filtrez lista după status

> Ca **utilizator**, vreau să văd doar activitățile cu un anumit status, ca să mă concentrez, de exemplu, doar pe cele restante.

**Prioritate:** Minim · **Caz de utilizare:** UC3 · **Teste:** TC-R2-03 (starea goală); restul de adăugat

Criterii de acceptare:

- Deasupra listei sunt filtrele Toate, Restant, Urmează, Complet și Anulat, fiecare cu numărul de activități. Filtrul ales e evidențiat.
- Un filtru fără activități arată un mesaj, de exemplu „Nicio activitate restantă”, cu sugestia de a alege alt filtru.
- Fără nicio activitate, lista arată „Nu ai nicio activitate încă” și trimite spre formularul de adăugare.

## R4 – Categorii

### US-R4-01 – Aleg o categorie pentru fiecare activitate

> Ca **utilizator**, vreau să pun fiecare activitate într-o categorie, ca să-mi separ activitățile pe domenii (muncă, școală, sală).

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC4 · **Teste:** de adăugat

Criterii de acceptare:

- Formularul are câmpul „Categorie”, cu valoarea implicită „Fără categorie”.
- Lista de categorii conține cele trei categorii predefinite (Muncă, Școală, Sală) și categoriile create de utilizator.
- Fiecare activitate își arată categoria ca etichetă lângă titlu.
- O activitate nu poate fi legată de categoria personală a altui utilizator.

### US-R4-02 – Filtrez lista după categorie

> Ca **utilizator**, vreau să văd doar activitățile dintr-o categorie, ca să lucrez pe rând la fiecare domeniu.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC4 · **Teste:** de adăugat

Criterii de acceptare:

- Deasupra listei sunt butoane pentru „Toate” și pentru fiecare categorie.
- Filtrul pe categorie se combină cu filtrul pe status, de exemplu „Școală” + „Restant”.
- Pe mobil se pot alege mai multe categorii deodată, iar lista arată câte categorii și câte activități sunt selectate.
- „Toate” (pe mobil, „Resetează”) anulează filtrul pe categorie.

### US-R4-03 – Grupez lista pe categorii

> Ca **utilizator**, vreau să-mi văd lista împărțită pe categorii, ca să am o imagine de ansamblu asupra fiecărui domeniu.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC4 · **Teste:** de adăugat

Criterii de acceptare:

- Comutatorul „Grupează pe categorii” împarte lista în secțiuni.
- Fiecare secțiune are ca titlu numele categoriei și numărul de activități, de exemplu „Școală (2)”.
- Activitățile fără categorie apar la final, în secțiunea „Fără categorie”.

### US-R4-04 – Îmi creez și îmi șterg categoriile

> Ca **utilizator**, vreau să-mi creez propriile categorii (de exemplu „Sport”) și să le șterg pe cele de care nu mai am nevoie, ca lista să se potrivească felului în care îmi organizez timpul.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC4 · **Teste:** de adăugat

Criterii de acceptare:

- „+ categorie nouă” deschide dialogul „Categorie nouă”, cu câmpul „Nume” și lista categoriilor proprii.
- Numele are între 1 și 40 de caractere și e unic printre categoriile utilizatorului. Culoarea e opțională, în formatul `#RRGGBB`.
- O categorie proprie se șterge din același dialog. Activitățile ei rămân, dar fără categorie.
- Categoriile predefinite nu pot fi modificate sau șterse.
- Categoriile proprii sunt vizibile doar celui care le-a creat.

## R5 – Autentificare și sincronizare

### US-R5-01 – Îmi creez un cont

> Ca **utilizator nou**, vreau să-mi creez un cont cu email și parolă, ca activitățile mele să fie salvate și disponibile pe orice dispozitiv.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC0 · **Teste:** de adăugat

Criterii de acceptare:

- Ecranul „Înregistrare” are câmpurile Email, Parolă și Confirmă parola.
- Dacă parolele diferă, emailul nu e valid sau e deja folosit, eroarea apare sub câmpul respectiv.
- După „Creează cont”, utilizatorul intră direct în lista de activități.
- De pe ecranul de autentificare se ajunge la înregistrare („Nu ai cont? Înregistrare”) și invers.

### US-R5-02 – Mă autentific și mă deconectez

> Ca **utilizator**, vreau să mă autentific o singură dată pe fiecare dispozitiv și să mă pot deconecta oricând, ca să-mi accesez repede activitățile, dar în siguranță.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC0 · **Teste:** de adăugat

Criterii de acceptare:

- Cu email și parolă corecte, „Autentificare” deschide lista de activități.
- Cu date greșite apare un mesaj de eroare, iar utilizatorul rămâne pe ecranul de autentificare.
- Sesiunea rămâne activă după reîncărcarea paginii (web) și după repornirea aplicației (mobil).
- Fără sesiune, paginile aplicației (de exemplu `/tasks`) duc la ecranul de autentificare.
- Deconectarea („Cont” pe web, „Log out” în tab-ul Profil pe mobil) închide sesiunea și duce la ecranul de autentificare.

### US-R5-03 – Activitățile mele sunt private

> Ca **utilizator**, vreau ca nimeni altcineva să nu-mi poată vedea, modifica sau șterge activitățile, ca datele mele să rămână private.

**Prioritate:** Obligatoriu · **Cazuri de utilizare:** UC0–UC2 · **Teste:** TC-SEC-01–TC-SEC-03

Criterii de acceptare:

- Un alt utilizator autentificat nu vede activitățile mele și nu le poate modifica sau șterge: cererile lui ating 0 rânduri.
- Fără autentificare nu se poate citi nimic din baza de date (`permission denied`).
- Regulile sunt impuse de baza de date (Row Level Security), nu doar de interfață, deci se aplică și cererilor trimise direct la API. Le verifică automat `supabase/tests/rls_tasks.sql`.

### US-R5-04 – Văd aceleași date pe web și pe mobil

> Ca **utilizator** care folosește și laptopul, și telefonul, vreau ca o modificare făcută pe un dispozitiv să apară și pe celălalt, ca să lucrez de oriunde fără să verific de două ori.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC5 · **Teste:** de adăugat (M3.10, M3.11)

Criterii de acceptare:

- Cu același cont pe două dispozitive, o activitate adăugată, modificată sau ștearsă pe unul apare pe celălalt în cel mult **5 secunde**, în ambele sensuri: web → mobil și mobil → web (obiectivul O4).
- O activitate ștearsă dispare de pe celălalt dispozitiv fără reîncărcarea paginii.
- Pe mobil, tragerea listei în jos (pull-to-refresh) reîncarcă datele manual.

### US-R5-05 – Încerc aplicația fără cont, în modul demo

> Ca **evaluator** sau **membru nou al echipei**, vreau să pot încerca aplicația fără cont și fără configurarea Supabase, ca să văd imediat funcțiile principale.

**Prioritate:** Important (nu e o cerință din charter; ajută la demonstrații și la testare) · **Caz de utilizare:** UC0 · **Teste:** de adăugat

Criterii de acceptare:

- Când aplicația nu are configurarea Supabase (lipsește fișierul `.env`), ecranul de autentificare arată butonul „Continuă în modul demo”.
- În modul demo, antetul arată eticheta „Mod demo”, iar aplicația pornește cu câteva activități de test.
- Modificările din modul demo se păstrează doar în memorie și nu se trimit nicăieri.
- Când Supabase e configurat, butonul nu apare.

## R6 – Remindere

### US-R6-01 – Primesc un reminder pentru activitățile critice

> Ca **utilizator**, vreau să marchez o activitate ca „Critic” și să primesc o notificare înainte de termen, ca să nu ratez lucrurile importante.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC6 · **Teste:** de adăugat (M4.7, M4.8)

Criterii de acceptare:

- Formularul are comutatorul „Critic”, dezactivat implicit.
- La prima activitate critică, aplicația cere permisiunea pentru notificări.
- Notificarea apare cu **o oră înainte de termen**, doar pentru activitățile critice care nu sunt Complete sau Anulate.
- Pe web, notificarea apare în browser cât timp aplicația e deschisă. Pe mobil e o notificare locală programată, care apare și cu aplicația închisă.
- Dacă permisiunea e refuzată, activitatea rămâne „Critic”, iar aplicația explică de ce nu vor apărea notificări.

### US-R6-02 – Reminderul urmează schimbările activității

> Ca **utilizator**, vreau ca reminderul să se mute sau să dispară când modific activitatea, ca să nu primesc notificări greșite.

**Prioritate:** Obligatoriu · **Caz de utilizare:** UC6 · **Teste:** de adăugat

Criterii de acceptare:

- Dacă schimb termenul unei activități critice, reminderul se reprogramează cu o oră înainte de noul termen.
- Dacă marchez activitatea Complet sau Anulat, o șterg sau dezactivez „Critic”, reminderul se anulează.
- Dacă reactivez o activitate critică al cărei termen e în viitor, reminderul se programează din nou.

## R7 – Eficiența activităților

### US-R7-01 – Văd câte activități am finalizat azi și în săptămâna aceasta

> Ca **utilizator**, vreau să văd câte activități am terminat azi și în săptămâna aceasta, ca să-mi urmăresc progresul.

**Prioritate:** Important · **Caz de utilizare:** UC7 · **Teste:** de adăugat (M4.8)

Criterii de acceptare:

- Pagina (pe mobil, tab-ul) „Statistici” arată două contoare: „Finalizate azi” și „Finalizate săptămâna aceasta”.
- O activitate se numără în ziua și în săptămâna în care a fost marcată Complet, după **ora României**, nu după ora UTC.
- Săptămâna începe luni la ora 00:00 și se termină duminică la ora 23:59.
- O activitate reactivată sau anulată ulterior nu mai contează ca finalizată.
- Cazurile limită (miezul nopții, începutul săptămânii, trecerea la ora de vară sau de iarnă) au teste dedicate.

### US-R7-02 – Văd rata de finalizare

> Ca **utilizator**, vreau să văd ce procent din activitățile mele am terminat, ca să știu cât de eficient sunt.

**Prioritate:** Important · **Caz de utilizare:** UC7 · **Teste:** de adăugat

Criterii de acceptare:

- Rata de finalizare este numărul activităților Complete împărțit la numărul activităților Complete, Restante și care Urmează. Cele anulate nu intră în calcul, pentru că nu mai trebuie făcute.
- Rata apare ca procent și ca bară de progres.
- Când nu există activități de luat în calcul, se afișează o stare goală, nu o valoare de tipul „NaN%”.

### US-R7-03 – Văd activitățile pe status, colorate diferit

> Ca **utilizator**, vreau să văd câte activități am în fiecare status, colorate diferit, ca să-mi dau seama repede unde mă aflu.

**Prioritate:** Important · **Caz de utilizare:** UC7 · **Teste:** TC-R3-14 (culorile); restul de adăugat

Criterii de acceptare:

- Pagina Statistici arată câte o casetă pentru Restant, Urmează, Complet și Anulat, cu numărul de activități și culoarea statusului, aceeași ca în listă.
- Comutatorul „Azi / Săptămâna aceasta” schimbă perioada pentru rata de finalizare și pentru casete.
- Sub casete apare numărul total de activități.

## R8 – Activități de grup (opțional)

Se implementează doar dacă R8 rămâne în scope, după decizia PM-ului împreună cu echipa.

### US-R8-01 – Creez un grup și invit membri

> Ca **utilizator** care împarte sarcini cu familia sau cu colegii, vreau să creez un grup și să primesc un cod de invitație, ca să-i pot adăuga pe ceilalți.

**Prioritate:** Opțional · **Caz de utilizare:** UC8 · **Teste:** de adăugat (M5.5)

Criterii de acceptare:

- „Creează grup” cere doar numele grupului. Creatorul devine automat membru, cu rolul de creator.
- Grupul are un cod de invitație unic, afișat cu butonul „Copiază”.
- Grupul apare în lista „Grupurile mele”, cu numărul de membri.

### US-R8-02 – Intru într-un grup cu un cod de invitație

> Ca **utilizator invitat**, vreau să intru într-un grup cu codul primit, ca să văd activitățile comune.

**Prioritate:** Opțional · **Caz de utilizare:** UC8 · **Teste:** de adăugat

Criterii de acceptare:

- „Intră într-un grup” cere codul de invitație. Cu un cod valid, grupul apare în „Grupurile mele”.
- Cu un cod invalid apare un mesaj de eroare, iar utilizatorul nu intră în niciun grup.
- Lista membrilor arată cine e creatorul grupului și cine sunt ceilalți membri.

### US-R8-03 – Lucrez cu activitățile grupului

> Ca **membru al unui grup**, vreau să adaug activități comune, pe care le văd și le pot modifica toți membrii, ca să ne împărțim sarcinile.

**Prioritate:** Opțional · **Caz de utilizare:** UC8 · **Teste:** de adăugat

Criterii de acceptare:

- Pagina grupului are lista „Activitățile grupului” și un formular de adăugare.
- Toți membrii văd aceste activități și le pot marca Complet, Anulat sau le pot șterge, la fel ca pe cele personale.
- Un utilizator care nu e membru nu vede activitățile grupului (Row Level Security).
- Activitățile grupului se sincronizează între membri la fel ca cele personale (US-R5-04).

### US-R8-04 – Părăsesc un grup

> Ca **membru al unui grup**, vreau să pot părăsi grupul, ca să nu mai văd activitățile lui.

**Prioritate:** Opțional · **Caz de utilizare:** UC8 · **Teste:** de adăugat

Criterii de acceptare:

- „Părăsește grupul” scoate utilizatorul din grup.
- După ieșire, utilizatorul nu mai vede grupul și nici activitățile lui.
