import { describe, expect, it } from 'vitest';

import { TITLE_MAX_LENGTH, validateNewTask } from './validation';

describe('validateNewTask', () => {
  it('accepts a title and a deadline, trimming the title and normalising the date', () => {
    expect(
      validateNewTask({ title: '  Tema SOPM  ', due_at: '2026-10-20T10:00:00+03:00' }),
    ).toEqual({ ok: true, value: { title: 'Tema SOPM', due_at: '2026-10-20T07:00:00.000Z' } });
  });

  it('accepts a deadline in the past (the task is then overdue)', () => {
    expect(validateNewTask({ title: 'Restanță', due_at: '2020-01-01T00:00:00Z' }).ok).toBe(true);
  });

  it('rejects an empty or whitespace-only title', () => {
    const result = validateNewTask({ title: '   ', due_at: '2026-10-20T10:00:00Z' });
    expect(result).toEqual({ ok: false, errors: { title: 'Titlul este obligatoriu.' } });
  });

  it(`rejects titles longer than ${TITLE_MAX_LENGTH} characters`, () => {
    const atLimit = validateNewTask({ title: 'a'.repeat(TITLE_MAX_LENGTH), due_at: '2026-10-20' });
    const overLimit = validateNewTask({
      title: 'a'.repeat(TITLE_MAX_LENGTH + 1),
      due_at: '2026-10-20',
    });
    expect(atLimit.ok).toBe(true);
    expect(overLimit.ok).toBe(false);
  });

  it('rejects a missing or invalid deadline', () => {
    expect(validateNewTask({ title: 'Ok', due_at: '' })).toEqual({
      ok: false,
      errors: { due_at: 'Alege un termen valid.' },
    });
    expect(validateNewTask({ title: 'Ok', due_at: 'mâine' }).ok).toBe(false);
  });

  it('reports both errors at once', () => {
    const result = validateNewTask({ title: '', due_at: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(['due_at', 'title']);
  });
});
