import type { TaskStatus } from './types';

/** Display order: what needs attention first. */
export const STATUS_ORDER: readonly TaskStatus[] = ['overdue', 'upcoming', 'completed', 'canceled'];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  overdue: 'Restant',
  upcoming: 'Urmează',
  completed: 'Complet',
  canceled: 'Anulat',
};

/** Status colours (R7 colour coding). White text on each passes WCAG AA. */
export const STATUS_COLORS: Record<TaskStatus, string> = {
  overdue: '#D32F2F',
  upcoming: '#1976D2',
  completed: '#2E7D32',
  canceled: '#757575',
};
