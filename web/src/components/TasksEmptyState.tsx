import { STATUS_LABELS } from '@kubidoit/shared';

import type { StatusFilterValue } from './StatusFilter';

interface TasksEmptyStateProps {
  /** `false` when the user has no tasks at all, whatever filter is selected. */
  hasTasks: boolean;
  filter: StatusFilterValue;
  /** Moves the focus to the add-task form. */
  onAddTask: () => void;
}

/** Shown instead of the task list when there is nothing to display. */
export function TasksEmptyState({ hasTasks, filter, onAddTask }: TasksEmptyStateProps) {
  if (!hasTasks || filter === 'all') {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Nu ai nicio activitate încă</p>
        <p className="muted">Adaugă prima activitate din formularul de mai sus.</p>
        <button type="button" className="btn btn--small" onClick={onAddTask}>
          Adaugă o activitate
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <p className="empty-state__title">Nicio activitate cu statusul „{STATUS_LABELS[filter]}”</p>
      <p className="muted">Alege alt filtru sau „Toate”.</p>
    </div>
  );
}
