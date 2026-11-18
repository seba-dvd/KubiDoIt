import type { ManualStatus, Task } from './types';

export type TasksAction =
  | { type: 'added'; task: Task }
  /** Insert or replace by id, for rows coming from Supabase Realtime. */
  | { type: 'upserted'; task: Task }
  | { type: 'removed'; id: string }
  /** `status: null` reactivates the task; `at` is the ISO time of the change. */
  | { type: 'statusChanged'; id: string; status: ManualStatus | null; at: string }
  | { type: 'replaced'; tasks: Task[] };

/** Local task list state, for `useReducer` in both apps. Pure: callers pass ids and timestamps. */
export function tasksReducer(tasks: Task[], action: TasksAction): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, action.task];
    case 'upserted':
      return tasks.some((task) => task.id === action.task.id)
        ? tasks.map((task) => (task.id === action.task.id ? action.task : task))
        : [...tasks, action.task];
    case 'removed':
      return tasks.filter((task) => task.id !== action.id);
    case 'statusChanged':
      return tasks.map((task) =>
        task.id === action.id ? withManualStatus(task, action.status, action.at) : task,
      );
    case 'replaced':
      return action.tasks;
  }
}

/** Applies a manual status with the same rules as the `tasks_before_write` database trigger. */
export function withManualStatus(task: Task, status: ManualStatus | null, at: string): Task {
  let completedAt: string | null = null;
  if (status === 'completed') {
    completedAt = task.manual_status === 'completed' ? task.completed_at : at;
  }
  return { ...task, manual_status: status, completed_at: completedAt, updated_at: at };
}
