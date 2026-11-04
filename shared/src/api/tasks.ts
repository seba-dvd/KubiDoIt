import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '../database.types';
import type { ManualStatus, Task } from '../types';
import type { NewTaskInput } from '../validation';

export type KubiClient = SupabaseClient<Database>;

/** All tasks of the signed-in user (RLS filters them), soonest deadline first. */
export async function listTasks(client: KubiClient): Promise<Task[]> {
  const { data, error } = await client.from('tasks').select('*').order('due_at');
  if (error) throw error;
  return data as Task[];
}

export async function createTask(client: KubiClient, input: NewTaskInput): Promise<Task> {
  const { data, error } = await client
    .from('tasks')
    .insert({ title: input.title, due_at: input.due_at })
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(client: KubiClient, id: string): Promise<void> {
  const { error } = await client.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

export async function setTaskStatus(
  client: KubiClient,
  id: string,
  status: ManualStatus | null,
): Promise<Task> {
  const { data, error } = await client
    .from('tasks')
    .update({ manual_status: status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}
