import { describe, expect, it } from 'vitest';

import type { TasksAction } from '../tasks-reducer';
import { subscribeToTasks, taskChangeToAction } from './realtime';
import type { KubiClient } from './tasks';

type Payload = Parameters<typeof taskChangeToAction>[0];

const row = {
  id: 't1',
  user_id: 'u1',
  category_id: null,
  title: 'Temă',
  description: null,
  due_at: '2026-11-20T10:00:00.000Z',
  manual_status: null,
  is_critical: false,
  completed_at: null,
  created_at: '2026-11-19T10:00:00.000Z',
  updated_at: '2026-11-19T10:00:00.000Z',
};

const payload = (eventType: 'INSERT' | 'UPDATE' | 'DELETE', fields: object): Payload =>
  ({
    eventType,
    schema: 'public',
    table: 'tasks',
    commit_timestamp: '2026-11-19T10:00:00.000Z',
    errors: [],
    new: eventType === 'DELETE' ? {} : fields,
    old: eventType === 'DELETE' ? fields : {},
  }) as unknown as Payload;

/** Fake Realtime client: keeps the change handler and the status callback so tests can call them. */
function fakeRealtimeClient() {
  const calls: Array<[string, unknown[]]> = [];
  const removed: unknown[] = [];
  let onChange: ((p: Payload) => void) | undefined;
  let onStatus: ((status: string, error?: Error) => void) | undefined;
  const channel = {
    on(type: string, filter: unknown, handler: (p: Payload) => void) {
      calls.push(['on', [type, filter]]);
      onChange = handler;
      return channel;
    },
    subscribe(callback: (status: string, error?: Error) => void) {
      onStatus = callback;
      return channel;
    },
  };
  const client = {
    channel: (name: string) => {
      calls.push(['channel', [name]]);
      return channel;
    },
    removeChannel: (ch: unknown) => {
      removed.push(ch);
      return Promise.resolve('ok');
    },
  };
  return {
    client: client as unknown as KubiClient,
    channel,
    calls,
    removed,
    emit: (p: Payload) => onChange?.(p),
    status: (s: string, e?: Error) => onStatus?.(s, e),
  };
}

describe('taskChangeToAction', () => {
  it('INSERT devine upserted cu rândul nou', () => {
    expect(taskChangeToAction(payload('INSERT', row))).toEqual({ type: 'upserted', task: row });
  });

  it('UPDATE devine upserted cu rândul modificat', () => {
    const changed = { ...row, manual_status: 'completed' };
    expect(taskChangeToAction(payload('UPDATE', changed))).toEqual({
      type: 'upserted',
      task: changed,
    });
  });

  it('DELETE devine removed după id (Supabase trimite doar cheia primară)', () => {
    expect(taskChangeToAction(payload('DELETE', { id: 't1' }))).toEqual({
      type: 'removed',
      id: 't1',
    });
  });

  it('DELETE fără id e ignorat', () => {
    expect(taskChangeToAction(payload('DELETE', {}))).toBeNull();
  });
});

describe('subscribeToTasks', () => {
  it('ascultă toate schimbările din public.tasks', () => {
    const fake = fakeRealtimeClient();

    subscribeToTasks(fake.client, () => {});

    expect(fake.calls).toContainEqual([
      'on',
      ['postgres_changes', { event: '*', schema: 'public', table: 'tasks' }],
    ]);
  });

  it('trimite fiecare schimbare ca acțiune pentru reducer', () => {
    const fake = fakeRealtimeClient();
    const actions: TasksAction[] = [];

    subscribeToTasks(fake.client, (action) => actions.push(action));
    fake.emit(payload('INSERT', row));
    fake.emit(payload('DELETE', { id: 't1' }));
    fake.emit(payload('DELETE', {}));

    expect(actions).toEqual([
      { type: 'upserted', task: row },
      { type: 'removed', id: 't1' },
    ]);
  });

  it('anunță erorile de conexiune, dar nu și abonarea reușită', () => {
    const fake = fakeRealtimeClient();
    const errors: string[] = [];

    subscribeToTasks(
      fake.client,
      () => {},
      (error) => errors.push(error.message),
    );
    fake.status('SUBSCRIBED');
    fake.status('TIMED_OUT');
    fake.status('CHANNEL_ERROR', new Error('socket închis'));

    expect(errors).toEqual(['Realtime: TIMED_OUT', 'socket închis']);
  });

  it('funcția întoarsă oprește abonarea', () => {
    const fake = fakeRealtimeClient();

    const unsubscribe = subscribeToTasks(fake.client, () => {});
    unsubscribe();

    expect(fake.removed).toEqual([fake.channel]);
  });

  it('fiecare abonare primește un canal cu nume diferit', () => {
    const fake = fakeRealtimeClient();

    subscribeToTasks(fake.client, () => {});
    subscribeToTasks(fake.client, () => {});

    const names = fake.calls.filter(([method]) => method === 'channel').map(([, args]) => args[0]);
    expect(new Set(names).size).toBe(2);
  });
});
