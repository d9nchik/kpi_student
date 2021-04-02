import { calculateLevel, calculateXPNeeded, LevelDescribe } from '../tools';

it('test calculateXPNeeded', () => {
  expect(calculateXPNeeded(1)).toBe(0);
  expect(calculateXPNeeded(2)).toBe(50);
  expect(calculateXPNeeded(5)).toBe(500);
});

it('test calculateLevel', () => {
  const first: LevelDescribe = { XPNeeded: 50, currentXP: 0, level: 1 };
  expect(calculateLevel(0)).toEqual(first);
  const second: LevelDescribe = { XPNeeded: 100, currentXP: 10, level: 2 };
  expect(calculateLevel(60)).toEqual(second);
  const third: LevelDescribe = { XPNeeded: 250, currentXP: 29, level: 5 };
  expect(calculateLevel(529)).toEqual(third);
});
