import { STATUS_COLORS, STATUS_LABELS, type TaskStatus } from '@kubidoit/shared';

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[status] }}>
      {STATUS_LABELS[status]}
    </span>
  );
}
