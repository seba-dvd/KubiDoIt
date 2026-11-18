import type { Category } from '../types';
import type { KubiClient } from './tasks';

/** Predefined categories + the user's own (RLS filters them), by name. */
export async function listCategories(client: KubiClient): Promise<Category[]> {
  const { data, error } = await client.from('categories').select('*').order('name');
  if (error) throw error;
  return data as Category[];
}

export interface NewCategoryInput {
  name: string;
  color?: string | null;
}

/** Creates a personal category; `user_id` is filled in by the database (auth.uid()). */
export async function createCategory(
  client: KubiClient,
  input: NewCategoryInput,
): Promise<Category> {
  const { data, error } = await client
    .from('categories')
    .insert({ name: input.name.trim(), color: input.color ?? null })
    .select()
    .single();
  if (error) throw error;
  return data as Category;
}

/** Deletes a personal category; its tasks keep existing, without a category. */
export async function deleteCategory(client: KubiClient, id: string): Promise<void> {
  const { error } = await client.from('categories').delete().eq('id', id);
  if (error) throw error;
}
