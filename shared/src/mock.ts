import { DEMO_USER_ID } from './local-task';
import type { ManualStatus, Task } from './types';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * Demo data with deadlines relative to `now`, so every one of the 4 statuses
 * is always on screen, whatever the current date.
 */
export function createMockTasks(now: Date = new Date()): Task[] {
  const at = (offset: number) => new Date(now.getTime() + offset).toISOString();

  const mock = (
    id: string,
    title: string,
    dueOffset: number,
    manualStatus: ManualStatus | null = null,
  ): Task => ({
    id,
    user_id: DEMO_USER_ID,
    category_id: null,
    title,
    description: null,
    due_at: at(dueOffset),
    manual_status: manualStatus,
    is_critical: false,
    completed_at: manualStatus === 'completed' ? at(-2 * HOUR) : null,
    created_at: at(-3 * DAY),
    updated_at: at(-2 * HOUR),
  });

  return [
    mock('mock-1', 'Predă tema la laborator', -1 * DAY),
    mock('mock-2', 'Antrenament la sală', 3 * HOUR),
    mock('mock-3', 'Pregătește prezentarea pentru ședința de proiect', 3 * DAY),
    mock('mock-4', 'Cumpărături pentru weekend', -4 * HOUR, 'completed'),
    mock('mock-5', 'Întâlnire amânată cu echipa', 1 * DAY, 'canceled'),
  ];
}
