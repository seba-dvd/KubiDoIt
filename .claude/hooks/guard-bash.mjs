// PreToolUse (Bash): blocks destructive or secret-leaking shell commands.
// Exit code 2 blocks the call; the stderr text is shown to Claude.
import { readFileSync } from 'node:fs';

let input = {};
try {
  input = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  process.exit(0);
}
const cmd = String(input?.tool_input?.command ?? '');

const rules = [
  [
    /\brm\s+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)[a-z]*\s+(\/|~|\$HOME|\.{1,2}\/?)(\s|$)/i,
    'rm -rf pe /, ~ sau pe tot folderul',
  ],
  [/\bgit\s+push\b[^\n]*(\s--force\b|\s-f\b|\s--force-with-lease\b)/, 'git push forțat'],
  [/\bgit\s+reset\s+--hard\b/, 'git reset --hard (pierde modificările nesalvate)'],
  [/\bgit\s+clean\s+-[a-z]*f/i, 'git clean -f (șterge fișiere netrack-uite)'],
  [
    /\b(curl|wget|iwr|Invoke-WebRequest)\b[^|\n]*\|\s*(sudo\s+)?(ba|z)?sh\b/i,
    'descărcare rulată direct în shell',
  ],
  [
    /\b(cat|type|less|more|head|tail|bat|Get-Content)\b[^\n|;&]*(^|[\s/\\])\.env(\.(local|development|production|prod|dev))?(\s|$)/i,
    'citirea unui fișier .env cu secrete',
  ],
  [/(^|[\s;&|])(printenv|env)(\s*$|\s*[;&|])/, 'afișarea tuturor variabilelor de mediu'],
  [/\b(drop\s+database|drop\s+schema\s+public)\b/i, 'ștergerea bazei de date'],
  [/\bsupabase\s+db\s+reset\b[^\n]*--linked\b/i, 'resetarea bazei Supabase din cloud'],
  [
    /\bdocker\s+compose\b[^\n]*\bdown\b[^\n]*\s-v\b/i,
    'docker compose down -v (șterge volumele cu date)',
  ],
  [/\bnpm\s+publish\b/i, 'npm publish'],
];

for (const [re, why] of rules) {
  if (re.test(cmd)) {
    process.stderr.write(
      `Blocat de .claude/hooks/guard-bash.mjs: ${why}. Dacă e chiar necesar, cere-i lui David să ruleze comanda el însuși.\n`,
    );
    process.exit(2);
  }
}
process.exit(0);
