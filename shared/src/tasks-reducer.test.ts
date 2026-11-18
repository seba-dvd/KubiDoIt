import { describe, expect, it } from 'vitest';

import { createLocalId, createLocalTask, DEMO_USER_ID } from './local-task';
import { tasksReducer } from './tasks-reducer';
import type { Task } from './types';

const NOW = new Date('2026-10-14T12:00:00.000Z');
const LATER = '2026-10-14T13:00:00.000Z';
const EVEN_LATER = '2026-10-14T14:00:00.000Z';

const task = (id: string): Task =>
  createLocalTask({ title: `Task ${id}`, due_at: '2026-10-20T10:00:00.000Z' }, NOW, id);

describe('createLocalTask', () => {
  it('fills in the defaults the database would apply', () => {
    expect(task('a')).toEqual({
      id: 'a',
      user_id: DEMO_USER_ID,
      category_id: null,
      title: 'Task a',
      description: null,
      due_at: '2026-10-20T10:00:00.000Z',
      manual_status: null,
      is_critical: false,
      completed_at: null,
      created_at: NOW.toISOString(),
      updated_at: NOW.toISOString(),
    });
  });

  it('generates unique local ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => createLocalId()));
    expect(ids.size).toBe(100);
  });
});

describe('tasksReducer', () => {
  it('adds a task (R1)', () => {
    expect(tasksReducer([task('a')], { type: 'added', task: task('b') }).map((t) => t.id)).toEqual([
      'a',
      'b',
    ]);
  });

  it('removes a task by id (R2)', () => {
    const state = [task('a'), task('b')];
    expect(tasksReducer(state, { type: 'removed', id: 'a' }).map((t) => t.id)).toEqual(['b']);
  });

  it('marks a task completed and records when (R3, R7)', () => {
    const [result] = tasksReducer([task('a')], {
      type: 'statusChanged',
      id: 'a',
      status: 'completed',
      at: LATER,
    });
    expect(result).toMatchObject({
      manual_status: 'completed',
      completed_at: LATER,
      updated_at: LATER,
    });
  });

  it('keeps the original completion time if completed again', () => {
    const completed = tasksReducer([task('a')], {
      type: 'statusChanged',
      id: 'a',
      status: 'completed',
      at: LATER,
    });
    const [again] = tasksReducer(completed, {
      type: 'statusChanged',
      id: 'a',
      status: 'completed',
      at: EVEN_LATER,
    });
    expect(again.completed_at).toBe(LATER);
  });

  it('clears the completion time when canceled or reactivated', () => {
    const completed = tasksReducer([task('a')], {
      type: 'statusChanged',
      id: 'a',
      status: 'completed',
      at: LATER,
    });
    const [canceled] = tasksReducer(completed, {
      type: 'statusChanged',
      id: 'a',
      status: 'canceled',
      at: EVEN_LATER,
    });
    const [reactivated] = tasksReducer(completed, {
      type: 'statusChanged',
      id: 'a',
      status: null,
      at: EVEN_LATER,
    });
    expect(canceled).toMatchObject({ manual_status: 'canceled', completed_at: null });
    expect(reactivated).toMatchObject({ manual_status: null, completed_at: null });
  });

  it('leaves other tasks untouched', () => {
    const state = [task('a'), task('b')];
    const next = tasksReducer(state, {
      type: 'statusChanged',
      id: 'a',
      status: 'canceled',
      at: LATER,
    });
    expect(next[1]).toBe(state[1]);
  });

  it('replaces the whole list', () => {
    expect(tasksReducer([task('a')], { type: 'replaced', tasks: [] })).toEqual([]);
  });
});

describe('tasksReducer – upserted', () => {
  const base = tasksReducer([], { type: 'added', task: task('t1') });

  it('adaugă activitatea dacă nu e în listă', () => {
    const next = tasksReducer(base, { type: 'upserted', task: task('t2') });
    expect(next.map((t) => t.id)).toEqual(['t1', 't2']);
  });

  it('înlocuiește activitatea cu același id, pe loc', () => {
    const next = tasksReducer(base, {
      type: 'upserted',
      task: { ...task('t1'), title: 'Modificată' },
    });
    expect(next).toHaveLength(1);
    expect(next[0]?.title).toBe('Modificată');
  });
});
