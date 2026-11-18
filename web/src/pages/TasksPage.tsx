import { computeStatus, countByStatus, sortTasksForDisplay } from '@kubidoit/shared';
import { useRef, useState } from 'react';

import { StatusFilter, type StatusFilterValue } from '../components/StatusFilter';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TasksEmptyState } from '../components/TasksEmptyState';
import { useNow } from '../hooks/useNow';
import { useTasks } from '../state/tasks-context';

export function TasksPage() {
  const { tasks } = useTasks();
  const now = useNow();
  const [filter, setFilter] = useState<StatusFilterValue>('all');
  const titleInputRef = useRef<HTMLInputElement>(null);

  const visible = sortTasksForDisplay(tasks, now).filter(
    (task) => filter === 'all' || computeStatus(task, now) === filter,
  );

  return (
    <section className="page stack">
      <h1>Activități</h1>
      <TaskForm titleInputRef={titleInputRef} />
      <StatusFilter
        value={filter}
        onChange={setFilter}
        counts={countByStatus(tasks, now)}
        total={tasks.length}
      />
      {visible.length > 0 ? (
        <TaskList tasks={visible} now={now} />
      ) : (
        <TasksEmptyState
          hasTasks={tasks.length > 0}
          filter={filter}
          onAddTask={() => titleInputRef.current?.focus()}
        />
      )}
    </section>
  );
}
