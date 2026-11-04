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

/** Returnează numărul de activități finalizate strict în ziua curentă (UTC). */
export function getCompletedTodayCount(tasks: readonly Task[], now: Date): number {
  return tasks.filter((t) => {
    if (!t.completed_at) return false;
    const d = new Date(t.completed_at);
    return (
      d.getUTCFullYear() === now.getUTCFullYear() &&
      d.getUTCMonth() === now.getUTCMonth() &&
      d.getUTCDate() === now.getUTCDate()
    );
  }).length;
}

/** Returnează numărul de activități finalizate în săptămâna curentă (Luni - Duminică, UTC). */
export function getCompletedThisWeekCount(tasks: readonly Task[], now: Date): number {
  const day = now.getUTCDay();
  // Ajustăm pentru ca Luni să fie prima zi (0 = Duminică, deci devine 6)
  const diffToMonday = now.getUTCDate() - day + (day === 0 ? -6 : 1);
  
  const start = new Date(now);
  start.setUTCDate(diffToMonday);
  start.setUTCHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);

  return tasks.filter((t) => {
    if (!t.completed_at) return false;
    const d = new Date(t.completed_at);
    return d >= start && d <= end;
  }).length;
}

/** Returnează momentul reminderului (cu 1 oră înainte) doar pentru activitățile critice. */
export function getReminderTime(task: Task): Date | null {
  if (!task.is_critical || !task.due_at) return null;
  const due = new Date(task.due_at);
  return new Date(due.getTime() - 60 * 60 * 1000); // minus 1 oră
}