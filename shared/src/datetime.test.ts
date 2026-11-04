import { describe, expect, it } from 'vitest';

import { toDateTimeLocalValue, tomorrowAtNoon } from './datetime';

// Dates built from local components, so the tests pass in any time zone.
describe('toDateTimeLocalValue', () => {
  it('pads months, days, hours and minutes', () => {
    expect(toDateTimeLocalValue(new Date(2026, 0, 5, 9, 7))).toBe('2026-01-05T09:07');
  });
});

describe('tomorrowAtNoon', () => {
  it('returns the next day at 12:00, across month and year ends', () => {
    expect(tomorrowAtNoon(new Date(2026, 9, 31, 22, 30))).toEqual(new Date(2026, 10, 1, 12, 0));
    expect(tomorrowAtNoon(new Date(2026, 11, 31, 8, 0))).toEqual(new Date(2027, 0, 1, 12, 0));
  });
});
