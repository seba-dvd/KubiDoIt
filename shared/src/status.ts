import type { Task, TaskStatus } from './types';

/**
 * Single source of truth for a task's status (R3).
 *
 * - `completed` / `canceled` are set by the user and always win;
 * - otherwise the task is `overdue` once `now` is past `due_at`, and `upcoming` until then.
 *
 * Overdue / upcoming are never stored, because they change with time.
 */
export function computeStatus(
  task: Pick<Task, 'due_at' | 'manual_status'>,
  now: Date = new Date(),
): TaskStatus {
  if (task.manual_status) return task.manual_status;
  // An invalid date parses to NaN, the comparison is false and the task stays upcoming.
  return now.getTime() > Date.parse(task.due_at) ? 'overdue' : 'upcoming';
}
