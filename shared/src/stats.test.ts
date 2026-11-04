import { describe, expect, it } from 'vitest';

import { createMockTasks } from './mock';
import {
  completionRate,
  countByStatus,
  sortTasksForDisplay,
  getCompletedTodayCount,
  getCompletedThisWeekCount,
  getReminderTime,
} from './stats';
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

describe('getCompletedTodayCount & getCompletedThisWeekCount', () => {
  // NOW din acest fișier este '2026-10-14T12:00:00.000Z' (o zi de Miercuri)
  const statsTasks: Task[] = [
    task('today1', '2026-10-14T10:00:00Z'), // Azi
    task('today2', '2026-10-14T10:00:00Z'), // Azi
    task('monday', '2026-10-12T10:00:00Z'), // Luni (aceeași săptămână)
    task('sunday', '2026-10-18T10:00:00Z'), // Duminică (aceeași săptămână)
    task('last-week', '2026-10-11T10:00:00Z'), // Duminica trecută (săptămâna anterioară)
  ];

  // Setăm data de finalizare pentru teste
  statsTasks[0].completed_at = '2026-10-14T15:00:00Z'; // azi
  statsTasks[1].completed_at = '2026-10-14T23:59:00Z'; // azi
  statsTasks[2].completed_at = '2026-10-12T15:00:00Z'; // luni
  statsTasks[3].completed_at = '2026-10-18T15:00:00Z'; // duminică
  statsTasks[4].completed_at = '2026-10-11T15:00:00Z'; // săptămâna trecută

  it('numără doar activitățile finalizate azi', () => {
    expect(getCompletedTodayCount(statsTasks, NOW)).toBe(2);
  });

  it('numără activitățile finalizate săptămâna aceasta (Luni-Duminică)', () => {
    // Trebuie să găsească 4 (luni, miercuri x2, duminică). Duminica trecută nu se pune.
    expect(getCompletedThisWeekCount(statsTasks, NOW)).toBe(4);
  });
});

describe('getReminderTime', () => {
  it('calculează reminderul cu o oră înainte pentru activități critice', () => {
    const criticalTask = task('crit', '2026-10-14T12:00:00Z');
    criticalTask.is_critical = true;

    const reminder = getReminderTime(criticalTask);
    expect(reminder?.toISOString()).toBe('2026-10-14T11:00:00.000Z');
  });

  it('returnează null dacă activitatea nu e critică', () => {
    const normalTask = task('norm', '2026-10-14T12:00:00Z');
    expect(getReminderTime(normalTask)).toBeNull();
  });
});
