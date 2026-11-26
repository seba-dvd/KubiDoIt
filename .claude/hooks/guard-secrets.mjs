// PreToolUse (Edit|Write|MultiEdit): blocks writing secrets into files and editing real .env files.
import { readFileSync } from 'node:fs';

let input = {};
try {
  input = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  process.exit(0);
}
const ti = input?.tool_input ?? {};
const file = String(ti.file_path ?? '');
const text = [
  ti.content,
  ti.new_string,
  ...(Array.isArray(ti.edits) ? ti.edits.map((e) => e?.new_string) : []),
]
  .filter((v) => typeof v === 'string')
  .join('\n');

const base = file.split(/[\\/]/).pop() ?? '';
if (/^\.env(\..+)?$/i.test(base) && !/\.(example|sample|template)$/i.test(base)) {
  process.stderr.write(
    `Blocat: ${base} conține secrete reale și nu se editează de agent. Modifică .env.example, iar David completează .env.\n`,
  );
  process.exit(2);
}

const secrets = [
  [/-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/, 'cheie privată'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'cheie AWS'],
  [/\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{40,}/, 'token GitHub'],
  [/\bsk-ant-[A-Za-z0-9_-]{20,}/, 'cheie API Anthropic'],
  [/\bsk-(proj-)?[A-Za-z0-9]{32,}/, 'cheie API OpenAI'],
  [/\bsk_live_[A-Za-z0-9]{20,}/, 'cheie Stripe live'],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}/, 'token Slack'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'cheie Google API'],
  [
    /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]*c2VydmljZV9yb2xl[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+/,
    'cheie Supabase service_role',
  ],
  [
    /\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["'][^"'\s$<{]{12,}["']/i,
    'secret scris direct în cod',
  ],
];

for (const [re, what] of secrets) {
  if (re.test(text)) {
    process.stderr.write(
      `Blocat de .claude/hooks/guard-secrets.mjs: textul conține ${what} în ${base || 'fișier'}. Folosește o variabilă de mediu și pune doar numele ei în .env.example.\n`,
    );
    process.exit(2);
  }
}
process.exit(0);
