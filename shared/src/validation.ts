/** What the user fills in when adding a task (R1). */
export interface NewTaskInput {
  title: string;
  /** Any string `Date.parse` understands, e.g. the value of an `<input type="datetime-local">`. */
  due_at: string;
}

export type NewTaskErrors = Partial<Record<keyof NewTaskInput, string>>;

export type NewTaskValidation =
  { ok: true; value: NewTaskInput } | { ok: false; errors: NewTaskErrors };

/** Same limit as the `title` check constraint in the database. */
export const TITLE_MAX_LENGTH = 200;

/** Validates the add-task form. On success, the title is trimmed and `due_at` is ISO 8601 (UTC). */
export function validateNewTask(input: NewTaskInput): NewTaskValidation {
  const errors: NewTaskErrors = {};

  const title = input.title.trim();
  if (!title) {
    errors.title = 'Titlul este obligatoriu.';
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Titlul poate avea cel mult ${TITLE_MAX_LENGTH} de caractere.`;
  }

  const due = Date.parse(input.due_at);
  if (Number.isNaN(due)) {
    errors.due_at = 'Alege un termen valid.';
  }

  if (errors.title || errors.due_at) return { ok: false, errors };
  return { ok: true, value: { title, due_at: new Date(due).toISOString() } };
}
