import type { Task } from './types';
import type { NewTaskInput } from './validation';

/** Owner of tasks created in demo mode, before authentication exists. */
export const DEMO_USER_ID = 'demo-user';

let localCounter = 0;

/**
 * Id for a task that only lives on the device (demo mode).
 * Avoids `crypto.randomUUID`, which Hermes (React Native) does not provide.
 */
export function createLocalId(): string {
  localCounter += 1;
  return `local-${Date.now().toString(36)}-${localCounter.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Builds a full task row from validated form input, with the defaults the database would apply. */
export function createLocalTask(
  input: NewTaskInput,
  now: Date,
  id: string = createLocalId(),
): Task {
  const timestamp = now.toISOString();
  return {
    id,
    user_id: DEMO_USER_ID,
    category_id: null,
    title: input.title,
    description: null,
    due_at: input.due_at,
    manual_status: null,
    is_critical: false,
    completed_at: null,
    created_at: timestamp,
    updated_at: timestamp,
  };
}
