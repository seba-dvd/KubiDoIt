import { describe, expect, it } from 'vitest';

import { filterByCategory, groupByCategory, NO_CATEGORY_LABEL } from './categories';
import type { Category, Task } from './types';

const task = (id: string, category_id: string | null): Task => ({
  id,
  user_id: 'u',
  category_id,
  title: id,
  description: null,
  due_at: '2026-11-20T12:00:00.000Z',
  manual_status: null,
  is_critical: false,
  completed_at: null,
  created_at: '2026-11-18T10:00:00.000Z',
  updated_at: '2026-11-18T10:00:00.000Z',
});

const category = (id: string, name: string): Category => ({
  id,
  user_id: null,
  name,
  color: null,
  created_at: '2026-11-18T10:00:00.000Z',
});

const munca = category('c-munca', 'Muncă');
const scoala = category('c-scoala', 'Școală');
const tasks = [
  task('t1', 'c-scoala'),
  task('t2', null),
  task('t3', 'c-munca'),
  task('t4', 'c-scoala'),
];

describe('filterByCategory', () => {
  it('fără selecție („Toate”) păstrează toate activitățile', () => {
    expect(filterByCategory(tasks, []).map((t) => t.id)).toEqual(['t1', 't2', 't3', 't4']);
  });

  it('păstrează doar activitățile din categoria aleasă', () => {
    expect(filterByCategory(tasks, ['c-scoala']).map((t) => t.id)).toEqual(['t1', 't4']);
  });

  it('acceptă mai multe categorii (selecția de pe mobil)', () => {
    expect(filterByCategory(tasks, ['c-scoala', 'c-munca']).map((t) => t.id)).toEqual([
      't1',
      't3',
      't4',
    ]);
  });

  it('null înseamnă „Fără categorie”', () => {
    expect(filterByCategory(tasks, [null]).map((t) => t.id)).toEqual(['t2']);
  });

  it('nu modifică lista primită', () => {
    const copy = [...tasks];
    filterByCategory(tasks, []).pop();
    expect(tasks).toEqual(copy);
  });
});

describe('groupByCategory', () => {
  it('face secțiuni în ordinea categoriilor, cu „Fără categorie” la final', () => {
    const groups = groupByCategory(tasks, [munca, scoala]);

    expect(groups.map((g) => g.category?.name ?? NO_CATEGORY_LABEL)).toEqual([
      'Muncă',
      'Școală',
      'Fără categorie',
    ]);
    expect(groups.map((g) => g.tasks.map((t) => t.id))).toEqual([['t3'], ['t1', 't4'], ['t2']]);
  });

  it('sare peste categoriile fără activități', () => {
    const groups = groupByCategory([task('t1', 'c-scoala')], [munca, scoala]);

    expect(groups.map((g) => g.category?.id)).toEqual(['c-scoala']);
  });

  it('o activitate cu o categorie necunoscută (ștearsă) ajunge la „Fără categorie”', () => {
    const groups = groupByCategory([task('t1', 'c-stearsa')], [munca]);

    expect(groups).toEqual([{ category: null, tasks: [task('t1', 'c-stearsa')] }]);
  });

  it('fără activități întoarce o listă goală', () => {
    expect(groupByCategory([], [munca, scoala])).toEqual([]);
  });
});
