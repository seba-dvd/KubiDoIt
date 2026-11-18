import { computeStatus, type Task } from '@kubidoit/shared';

import { TaskItem } from './TaskItem';

/** The empty states live in `TasksEmptyState`; this component only renders a non-empty list. */
export function TaskList({ tasks, now }: { tasks: Task[]; now: Date }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} status={computeStatus(task, now)} />
      ))}
    </ul>
  );
}
