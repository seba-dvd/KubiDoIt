---
name: livrare
description: Verificarea completă înainte de commit sau PR — teste, securitate și critică independentă, apoi PR. Folosește-l când David spune „/livrare”, „gata de PR”, „verifică înainte de push” sau termină o funcționalitate.
---

# Livrare: verificare înainte de PR

Răspunde în română. Nu sări pași și nu face push fără confirmarea lui David.

1. **Ce se livrează.** `git status` și `git diff --stat` față de ramura de bază. Dacă sunt fișiere care nu țin de schimbare, întreabă înainte să le incluzi.
2. **Teste.** Pornește subagentul `test-runner`. Dacă ceva pică, repară, apoi rulează din nou până trece tot.
3. **Securitate.** Pornește subagentul `security-reviewer` pe diff. Problemele critice și mari se repară înainte de PR; cele medii și mici intră în descrierea PR-ului ca „de făcut”.
4. **Critică.** Dacă există subagentul `critic`, pornește-l cu o descriere scurtă a schimbării (fără tonul conversației). Verifică fiecare punct în cod; repară ce e confirmat și ține de schimbare.
5. **Decizii.** Dacă schimbarea a luat o decizie greu de inversat (bibliotecă nouă, schemă, protocol, structură), adaugă un ADR scurt în `docs/decisions/`.
6. **Commit și PR.** Commit cu mesaj în convenția repo-ului; arată-i lui David titlul și descrierea PR-ului (ce face, cum s-a testat, ce a găsit revizuirea de securitate, ce rămâne) și cere confirmarea înainte de push.
7. **Dashboard.** La final, oferă actualizarea proiectului în „Proiectele mele” (skill-ul `actualizare-proiect-dashboard`).
