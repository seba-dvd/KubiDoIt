/** The status shown for a task (R3). */
export type TaskStatus = 'overdue' | 'upcoming' | 'completed' | 'canceled';

/** Statuses the user sets by hand; overdue / upcoming are always derived from `due_at`. */
export type ManualStatus = 'completed' | 'canceled';

/**
 * A task, with the same fields as a row of `public.tasks`
 * (see supabase/migrations). Dates are ISO 8601 strings.
 */
export interface Task {
  id: string;
  user_id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  due_at: string;
  manual_status: ManualStatus | null;
  is_critical: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}
