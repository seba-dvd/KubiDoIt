import { computeStatus, type Task } from '@kubidoit/shared';

import { TaskItem } from './TaskItem';

export function TaskList({ tasks, now }: { tasks: Task[]; now: Date }) {
  if (tasks.length === 0) {
    return <p className="muted empty">Nicio activitate aici.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} status={computeStatus(task, now)} />
      ))}
    </ul>
  );
}
