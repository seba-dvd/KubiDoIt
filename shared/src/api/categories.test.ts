import { describe, expect, it } from 'vitest';

import { createCategory, deleteCategory, listCategories } from './categories';
import { fakeClient } from './fake-client';

const row = {
  id: 'c1',
  user_id: 'u1',
  name: 'Sport',
  color: '#00AA55',
  created_at: '2026-11-18T10:00:00.000Z',
};

describe('listCategories', () => {
  it('citește categoriile ordonate după nume', async () => {
    const { client, calls } = fakeClient({ data: [row], error: null });

    await expect(listCategories(client)).resolves.toEqual([row]);

    expect(calls).toContainEqual(['from', ['categories']]);
    expect(calls).toContainEqual(['order', ['name']]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });

    await expect(listCategories(client)).rejects.toThrow('boom');
  });
});

describe('createCategory', () => {
  it('trimite numele fără spațiile de la capete și culoarea', async () => {
    const { client, calls } = fakeClient({ data: row, error: null });

    await expect(createCategory(client, { name: '  Sport  ', color: '#00AA55' })).resolves.toEqual(
      row,
    );

    expect(calls).toContainEqual(['insert', [{ name: 'Sport', color: '#00AA55' }]]);
  });

  it('fără culoare trimite color: null', async () => {
    const { client, calls } = fakeClient({ data: row, error: null });

    await createCategory(client, { name: 'Sport' });

    expect(calls).toContainEqual(['insert', [{ name: 'Sport', color: null }]]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('duplicate key') });

    await expect(createCategory(client, { name: 'Sport' })).rejects.toThrow('duplicate key');
  });
});

describe('deleteCategory', () => {
  it('șterge categoria după id', async () => {
    const { client, calls } = fakeClient({ data: null, error: null });

    await expect(deleteCategory(client, 'c1')).resolves.toBeUndefined();

    expect(calls).toContainEqual(['from', ['categories']]);
    expect(calls).toContainEqual(['delete', []]);
    expect(calls).toContainEqual(['eq', ['id', 'c1']]);
  });

  it('aruncă eroarea primită de la Supabase', async () => {
    const { client } = fakeClient({ data: null, error: new Error('boom') });

    await expect(deleteCategory(client, 'c1')).rejects.toThrow('boom');
  });
});
