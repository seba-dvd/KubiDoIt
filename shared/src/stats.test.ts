import { describe, expect, it } from 'vitest';

import { createMockTasks } from './mock';
import { completionRate, countByStatus, sortTasksForDisplay } from './stats';
import { computeStatus } from './status';
import type { ManualStatus, Task } from './types';

const NOW = new Date('2026-10-14T12:00:00.000Z');

const task = (id: string, due_at: string, manual_status: ManualStatus | null = null): Task => ({
  id,
  user_id: 'u',
  category_id: null,
  title: id,
  description: null,
  due_at,
  manual_status,
  is_critical: false,
  completed_at: null,
  created_at: due_at,
  updated_at: due_at,
});

const tasks = [
  task('overdue', '2026-10-13T12:00:00Z'),
  task('upcoming-later', '2026-10-16T12:00:00Z'),
  task('upcoming-soon', '2026-10-15T12:00:00Z'),
  task('completed', '2026-10-13T12:00:00Z', 'completed'),
  task('canceled', '2026-10-15T12:00:00Z', 'canceled'),
];

describe('countByStatus', () => {
  it('counts each status', () => {
    expect(countByStatus(tasks, NOW)).toEqual({
      overdue: 1,
      upcoming: 2,
      completed: 1,
      canceled: 1,
    });
  });

  it('returns zeros for an empty list', () => {
    expect(countByStatus([], NOW)).toEqual({ overdue: 0, upcoming: 0, completed: 0, canceled: 0 });
  });
});

describe('completionRate', () => {
  it('divides completed by all tasks except canceled ones', () => {
    expect(completionRate(tasks, NOW)).toBe(1 / 4);
  });

  it('is null when there is nothing to complete', () => {
    expect(completionRate([], NOW)).toBeNull();
    expect(completionRate([task('c', '2026-10-15T12:00:00Z', 'canceled')], NOW)).toBeNull();
  });
});

describe('sortTasksForDisplay', () => {
  it('shows overdue first, then upcoming by nearest deadline, then completed and canceled', () => {
    expect(sortTasksForDisplay(tasks, NOW).map((t) => t.id)).toEqual([
      'overdue',
      'upcoming-soon',
      'upcoming-later',
      'completed',
      'canceled',
    ]);
  });

  it('does not mutate the input', () => {
    const copy = [...tasks];
    sortTasksForDisplay(tasks, NOW);
    expect(tasks).toEqual(copy);
  });
});

describe('createMockTasks', () => {
  it('always contains all 4 statuses, whatever the date', () => {
    for (const now of [NOW, new Date('2030-02-28T23:59:59Z')]) {
      const statuses = new Set(createMockTasks(now).map((t) => computeStatus(t, now)));
      expect(statuses).toEqual(new Set(['overdue', 'upcoming', 'completed', 'canceled']));
    }
  });
});
