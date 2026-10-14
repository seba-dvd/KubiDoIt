import { describe, expect, it } from 'vitest';

import { computeStatus } from './status';

const NOW = new Date('2026-10-14T12:00:00.000Z');
const PAST = '2026-10-13T12:00:00.000Z';
const FUTURE = '2026-10-15T12:00:00.000Z';

describe('computeStatus', () => {
  it('is upcoming while the deadline has not passed', () => {
    expect(computeStatus({ due_at: FUTURE, manual_status: null }, NOW)).toBe('upcoming');
  });

  it('is overdue once the deadline has passed', () => {
    expect(computeStatus({ due_at: PAST, manual_status: null }, NOW)).toBe('overdue');
  });

  it('keeps a manual status after the deadline', () => {
    expect(computeStatus({ due_at: PAST, manual_status: 'completed' }, NOW)).toBe('completed');
    expect(computeStatus({ due_at: PAST, manual_status: 'canceled' }, NOW)).toBe('canceled');
  });

  it('keeps a manual status before the deadline', () => {
    expect(computeStatus({ due_at: FUTURE, manual_status: 'completed' }, NOW)).toBe('completed');
    expect(computeStatus({ due_at: FUTURE, manual_status: 'canceled' }, NOW)).toBe('canceled');
  });

  it('is still upcoming exactly at the deadline', () => {
    expect(computeStatus({ due_at: NOW.toISOString(), manual_status: null }, NOW)).toBe('upcoming');
  });

  it('becomes overdue 1 ms after the deadline', () => {
    const justAfter = new Date(NOW.getTime() + 1);
    expect(computeStatus({ due_at: NOW.toISOString(), manual_status: null }, justAfter)).toBe(
      'overdue',
    );
  });

  it('compares instants, so time zone offsets do not matter', () => {
    // 14:00 in Bucharest (UTC+3 in October) is 11:00 UTC, already past 12:00 UTC.
    expect(computeStatus({ due_at: '2026-10-14T14:00:00+03:00', manual_status: null }, NOW)).toBe(
      'overdue',
    );
  });

  it('treats an invalid deadline as upcoming instead of throwing', () => {
    expect(computeStatus({ due_at: 'not-a-date', manual_status: null }, NOW)).toBe('upcoming');
  });

  it('uses the current time by default', () => {
    expect(computeStatus({ due_at: '2000-01-01T00:00:00Z', manual_status: null })).toBe('overdue');
  });
});
