import { createLocalTask, createMockTasks, tasksReducer } from '@kubidoit/shared';
import { useMemo, useReducer, type ReactNode } from 'react';

import { TasksContext, type TasksContextValue } from './tasks-context';

/** Demo mode: tasks live in memory, seeded with mock data. Supabase replaces this in M3. */
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, () => createMockTasks());

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      addTask: (input) => dispatch({ type: 'added', task: createLocalTask(input, new Date()) }),
      removeTask: (id) => dispatch({ type: 'removed', id }),
      setTaskStatus: (id, status) =>
        dispatch({ type: 'statusChanged', id, status, at: new Date().toISOString() }),
    }),
    [tasks],
  );

  return <TasksContext value={value}>{children}</TasksContext>;
}
