const pad = (value: number) => String(value).padStart(2, '0');

/** Formats a date as the local-time value an `<input type="datetime-local">` expects. */
export function toDateTimeLocalValue(date: Date): string {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/** Default deadline for a new task: tomorrow at 12:00. */
export function tomorrowAtNoon(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(12, 0, 0, 0);
  return date;
}
