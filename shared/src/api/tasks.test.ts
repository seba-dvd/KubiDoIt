import { describe, expect, it } from 'vitest';

import { createTask, deleteTask, listTasks, setTaskStatus } from './tasks';
import { fakeClient } from './fake-client';

const row = { id: 't1', title: 'Temă', due_at: '2026-11-05T10:00:00.000Z', manual_status: null };

describe('createTask', () => {
  it('trimite doar titlul și termenul și întoarce rândul creat', async () => {
    const { client, calls } = fakeClient({ data: row, error: null });

    await expect(createTask(client, { title: 'Temă', due_at: row.due_at })).resolves.toEqual(row);

    expect(calls).toContainEqual(['from', ['tasks']]);
    expect(calls).toContainEqual(['insert', [{ title: 'Temă', due_at: row.due_at }]]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });

    await expect(createTask(client, { title: 'Temă', due_at: row.due_at })).rejects.toThrow('boom');
  });
});

describe('deleteTask', () => {
  it('șterge sarcina cu ID-ul dat', async () => {
    const { client, calls } = fakeClient({ data: null, error: null });

    await deleteTask(client, 't1');

    expect(calls).toContainEqual(['from', ['tasks']]);
    expect(calls).toContainEqual(['delete', []]);
    expect(calls).toContainEqual(['eq', ['id', 't1']]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });

    await expect(deleteTask(client, 't1')).rejects.toThrow('boom');
  });
});

describe('setTaskStatus', () => {
  it('actualizează statusul manual al sarcinii și întoarce rândul actualizat', async () => {
    const updatedRow = { ...row, manual_status: 'completed' };
    const { client, calls } = fakeClient({ data: updatedRow, error: null });

    await expect(setTaskStatus(client, 't1', 'completed')).resolves.toEqual(updatedRow);

    expect(calls).toContainEqual(['from', ['tasks']]);
    expect(calls).toContainEqual(['update', [{ manual_status: 'completed' }]]);
    expect(calls).toContainEqual(['eq', ['id', 't1']]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });
    await expect(setTaskStatus(client, 't1', null)).rejects.toThrow('boom');
  });
});

describe('listTasks', () => {
  it('returnează lista de sarcini ordonată după termen', async () => {
    const tasks = [
      { id: 't1', title: 'Temă 1', due_at: '2026-11-05T10:00:00.000Z', manual_status: null },
      { id: 't2', title: 'Temă 2', due_at: '2026-11-06T10:00:00.000Z', manual_status: null },
      { id: 't3', title: 'Temă 3', due_at: '2026-11-07T10:00:00.000Z', manual_status: null },
    ];
    const { client, calls } = fakeClient({ data: tasks, error: null });

    await expect(listTasks(client)).resolves.toEqual(tasks);

    expect(calls).toContainEqual(['from', ['tasks']]);
    expect(calls).toContainEqual(['select', ['*']]);
    expect(calls).toContainEqual(['order', ['due_at']]);
  });
  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });

    await expect(listTasks(client)).rejects.toThrow('boom');
  });
});
