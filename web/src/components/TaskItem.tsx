import { formatDue, STATUS_COLORS, type Task, type TaskStatus } from '@kubidoit/shared';

import { useTasks } from '../state/tasks-context';
import { StatusBadge } from './StatusBadge';

export function TaskItem({ task, status }: { task: Task; status: TaskStatus }) {
  const { removeTask, setTaskStatus } = useTasks();
  const isClosed = status === 'completed' || status === 'canceled';

  return (
    <li
      className={`card task${isClosed ? ' task--closed' : ''}`}
      style={{ borderLeftColor: STATUS_COLORS[status] }}
    >
      <div className="task__body">
        <p className="task__title">{task.title}</p>
        <p className="task__due muted">
          Termen: <time dateTime={task.due_at}>{formatDue(task.due_at)}</time>
        </p>
      </div>
      <StatusBadge status={status} />
      <div className="task__actions">
        {task.manual_status === null ? (
          <>
            <button
              type="button"
              className="btn btn--small"
              onClick={() => setTaskStatus(task.id, 'completed')}
            >
              Complet
            </button>
            <button
              type="button"
              className="btn btn--small"
              onClick={() => setTaskStatus(task.id, 'canceled')}
            >
              Anulează
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn--small"
            onClick={() => setTaskStatus(task.id, null)}
          >
            Reactivează
          </button>
        )}
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => removeTask(task.id)}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
