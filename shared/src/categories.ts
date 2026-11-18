import type { Category, Task } from './types';

/** Section title for tasks without a category (wireframe 04 · Categorii). */
export const NO_CATEGORY_LABEL = 'Fără categorie';

/**
 * Keeps the tasks in the selected categories. `null` in the list means "without a category".
 * An empty selection means "Toate": every task is kept. Mobile can select several categories.
 */
export function filterByCategory(
  tasks: readonly Task[],
  selected: readonly (string | null)[],
): Task[] {
  if (selected.length === 0) return [...tasks];
  const wanted = new Set(selected);
  return tasks.filter((task) => wanted.has(task.category_id));
}

export interface CategoryGroup {
  /** `null` for the "Fără categorie" section. */
  category: Category | null;
  tasks: Task[];
}

/**
 * Splits tasks into sections, in the order of `categories`. Empty sections are skipped.
 * Tasks without a category, or with a category that is not in the list, come last.
 * The order of tasks inside a section is kept, so sort them before grouping.
 */
export function groupByCategory(
  tasks: readonly Task[],
  categories: readonly Category[],
): CategoryGroup[] {
  const known = new Set(categories.map((category) => category.id));
  const byCategory = new Map<string, Task[]>();
  const withoutCategory: Task[] = [];

  for (const task of tasks) {
    if (task.category_id !== null && known.has(task.category_id)) {
      const list = byCategory.get(task.category_id) ?? [];
      list.push(task);
      byCategory.set(task.category_id, list);
    } else {
      withoutCategory.push(task);
    }
  }

  const groups: CategoryGroup[] = categories
    .filter((category) => byCategory.has(category.id))
    .map((category) => ({ category, tasks: byCategory.get(category.id) ?? [] }));
  if (withoutCategory.length > 0) groups.push({ category: null, tasks: withoutCategory });
  return groups;
}
