# Ghidurile echipei

Fiecare membru are aici un ghid cu ce are de făcut, în ordine și cu termene. Pe GitHub are un issue cu toate sarcinile lui și o ramură proprie de lucru.

| Membru            | Rol          | Ghid                     | Sarcinile pe GitHub                                 | Ramura                                                       |
| ----------------- | ------------ | ------------------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| Nicolescu Andreas | QA + cerințe | [andreas.md](andreas.md) | [#2](https://github.com/seba-dvd/KubiDoIt/issues/2) | `docs/andreas-pm` (documente), `feature/andreas-tests` (cod) |
| Mituleci Tudor    | web          | [tudor.md](tudor.md)     | [#3](https://github.com/seba-dvd/KubiDoIt/issues/3) | `feature/tudor-web`                                          |
| Kubanda Andrei    | mobil        | [andrei.md](andrei.md)   | [#4](https://github.com/seba-dvd/KubiDoIt/issues/4) | `feature/andrei-mobile`                                      |
| Pilat David       | PM + backend | [david.md](david.md)     | [#5](https://github.com/seba-dvd/KubiDoIt/issues/5) | `feature/david-backend`                                      |

Termenele vin din charter și sunt [milestone-uri pe GitHub](https://github.com/seba-dvd/KubiDoIt/milestones):

| Termen     | Ședința | Ce se predă / se verifică                                                            |
| ---------- | ------- | ------------------------------------------------------------------------------------ |
| 22.10.2026 | 2       | **L1**: planificare și specificații                                                  |
| 05.11.2026 | 3       | punct de control: aplicația web cu R1–R3 și autentificare                            |
| 19.11.2026 | 4       | **L2**: aplicația web cu R1–R7, publicată pe Vercel, + documentație                  |
| 03.12.2026 | 5       | punct de control: aplicația mobilă cu R1–R5, pe același backend                      |
| 17.12.2026 | 6       | **L3**: aplicația mobilă completă (notificări, APK) + documentație; R8 dacă se poate |

Cum se lucrează pe ramura proprie:

1. `git fetch origin`, `git switch <ramura ta>`, `git merge origin/main`.
2. Pentru fiecare sarcină terminată, un PR în `main`, cu `Closes #<issue>` în descriere.
3. CI `verify` verde (un review de la un coleg e recomandat, nu obligatoriu), _Create a merge commit_.
4. Ramura nu se șterge după merge: lucrul continuă pe ea.
