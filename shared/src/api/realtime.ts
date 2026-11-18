import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

import type { Database } from '../database.types';
import type { TasksAction } from '../tasks-reducer';
import type { Task } from '../types';
import type { KubiClient } from './tasks';

type TaskRow = Database['public']['Tables']['tasks']['Row'];

/**
 * Turns a Realtime change on `public.tasks` into an action for `tasksReducer`.
 * INSERT and UPDATE carry the whole row; DELETE carries only the primary key,
 * because the row no longer exists. Returns `null` for a DELETE without an id.
 */
export function taskChangeToAction(
  payload: RealtimePostgresChangesPayload<TaskRow>,
): TasksAction | null {
  if (payload.eventType === 'DELETE') {
    return payload.old.id ? { type: 'removed', id: payload.old.id } : null;
  }
  return { type: 'upserted', task: payload.new as Task };
}

let channelCount = 0;

/**
 * Listens to INSERT / UPDATE / DELETE on `public.tasks` and calls `onAction` with the
 * matching `tasksReducer` action, so an app can pass its `dispatch` directly.
 * RLS applies to Realtime too: each user only receives changes to their own tasks.
 * Returns the function that stops listening, to use as the cleanup of a React effect.
 */
export function subscribeToTasks(
  client: KubiClient,
  onAction: (action: TasksAction) => void,
  onError?: (error: Error) => void,
): () => void {
  channelCount += 1;
  const channel = client
    .channel(`tasks-changes-${channelCount}`)
    .on<TaskRow>(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      (payload) => {
        const action = taskChangeToAction(payload);
        if (action) onAction(action);
      },
    )
    .subscribe((status, error) => {
      const state = String(status);
      if (state === 'CHANNEL_ERROR' || state === 'TIMED_OUT') {
        onError?.(error ?? new Error(`Realtime: ${state}`));
      }
    });

  return () => {
    void client.removeChannel(channel);
  };
}
