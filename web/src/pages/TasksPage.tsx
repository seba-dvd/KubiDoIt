import { computeStatus, countByStatus, sortTasksForDisplay } from '@kubidoit/shared';
import { useState } from 'react';

import { StatusFilter, type StatusFilterValue } from '../components/StatusFilter';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { useNow } from '../hooks/useNow';
import { useTasks } from '../state/tasks-context';

export function TasksPage() {
  const { tasks } = useTasks();
  const now = useNow();
  const [filter, setFilter] = useState<StatusFilterValue>('all');

  const visible = sortTasksForDisplay(tasks, now).filter(
    (task) => filter === 'all' || computeStatus(task, now) === filter,
  );

  return (
    <section className="page stack">
      <h1>Activități</h1>
      <TaskForm />
      <StatusFilter
        value={filter}
        onChange={setFilter}
        counts={countByStatus(tasks, now)}
        total={tasks.length}
      />
      <TaskList tasks={visible} now={now} />
    </section>
  );
}
