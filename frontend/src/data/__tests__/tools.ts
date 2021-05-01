import { calculateLevel, calculateXPNeeded, randomRangeValue } from '../tools';

jest.mock('../dataStorage.ts');
jest.mock('../auth.ts');

describe('tools.ts', () => {
  test('calculateLevel', () => {
    expect(calculateLevel(48)).toEqual({
      level: 1,
      currentXP: 48,
      XPNeeded: 50,
    });
  });

  test('calculate XPNeeded', () => {
    expect(calculateXPNeeded(2)).toBe(50);
    expect(calculateXPNeeded(3)).toBe(150);
  });

  test('randomRangeLevel', () => {
    expect(randomRangeValue(1, 1)).toBe(1);
  });
});
