import type { ManualStatus, NewTaskInput, Task } from '@kubidoit/shared';
import { createContext, useContext } from 'react';

export interface TasksContextValue {
  tasks: Task[];
  /** Expects input already checked with `validateNewTask`. */
  addTask: (input: NewTaskInput) => void;
  removeTask: (id: string) => void;
  /** `null` reactivates the task (back to overdue / upcoming). */
  setTaskStatus: (id: string, status: ManualStatus | null) => void;
}

export const TasksContext = createContext<TasksContextValue | null>(null);

export function useTasks(): TasksContextValue {
  const value = useContext(TasksContext);
  if (!value) throw new Error('useTasks() must be used inside <TasksProvider>');
  return value;
}
