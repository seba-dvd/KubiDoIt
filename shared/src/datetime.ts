const pad = (value: number) => String(value).padStart(2, '0');

/** Formats a date as the local-time value an HTML `<input type="datetime-local">` expects. */
export function toDateTimeLocalValue(date: Date): string {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/** Default deadline for a new task: tomorrow at 12:00, local time. */
export function tomorrowAtNoon(now: Date = new Date()): Date {
  const date = new Date(now);
  date.setDate(date.getDate() + 1);
  date.setHours(12, 0, 0, 0);
  return date;
}
