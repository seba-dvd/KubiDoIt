// Explicit fields instead of dateStyle / timeStyle, which older Hermes builds don't support.
const dueFormatter = new Intl.DateTimeFormat('ro-RO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/** Formats an ISO date in the device's time zone, e.g. "14 oct. 2026, 18:30". */
export function formatDue(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : dueFormatter.format(date);
}
