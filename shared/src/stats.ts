import { STATUS_ORDER } from './labels';
import { computeStatus } from './status';
import type { Task, TaskStatus } from './types';

export function countByStatus(tasks: readonly Task[], now: Date): Record<TaskStatus, number> {
  const counts: Record<TaskStatus, number> = { overdue: 0, upcoming: 0, completed: 0, canceled: 0 };
  for (const task of tasks) counts[computeStatus(task, now)] += 1;
  return counts;
}

/**
 * Share of tasks that were completed, between 0 and 1. Canceled tasks don't count,
 * since nobody has to do them anymore. `null` when there is nothing to complete.
 */
export function completionRate(tasks: readonly Task[], now: Date): number | null {
  const counts = countByStatus(tasks, now);
  const relevant = counts.completed + counts.overdue + counts.upcoming;
  return relevant === 0 ? null : counts.completed / relevant;
}

/** Display order: by status (overdue first, see STATUS_ORDER), then by the nearest deadline. */
export function sortTasksForDisplay(tasks: readonly Task[], now: Date): Task[] {
  const rank = (task: Task) => STATUS_ORDER.indexOf(computeStatus(task, now));
  return [...tasks].sort(
    (a, b) => rank(a) - rank(b) || Date.parse(a.due_at) - Date.parse(b.due_at),
  );
}
