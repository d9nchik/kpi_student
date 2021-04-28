import {
  calculateLevel,
  calculateXPNeeded,
  randomRangeValue,
  parseMenuCharacteristic,
  getDayInUniversity,
  applyMenuCharacteristic,
  applyQuizVariantItem,
} from '../tools';
import { newGameObj, getGameObj } from '../../data/dataStorage';

jest.mock('../dataStorage.ts');
jest.mock('../auth.ts');

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

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

test('parseMenuCharacteristic', () => {
  expect(parseMenuCharacteristic(123, 2)).toBe(123);
  expect(parseMenuCharacteristic('hfdjhfk', 1)).toBe(0);
  expect(parseMenuCharacteristic('25%', 2)).toBe(50);
});

test('getDayInUniversity', () => {
  expect(getDayInUniversity()).toBe('a few seconds');
});

test('applyQuizVariantItem', async () => {
  applyQuizVariantItem(
    0.35,
    {
      educationLevel: { minValue: 300 },
    },
    {
      educationLevel: { maxValue: 100 },
      heartsPoint: { minValue: -20, maxValue: -20 },
      careLevel: { minValue: 500 },
      money: {},
    },
    newGameObj
  );
  expect(await getGameObj()).toEqual({
    careLevel: 100,
    characterName: 'Sam',
    educationLevel: 100,
    gameLevel: 13.5,
    heartsPoint: 80,
    isDead: false,
    mentalStrength: 100,
    money: 5000,
    satietyLevel: 100,
  });

  applyQuizVariantItem(
    0.75,
    {
      money: { minValue: 300 },
      educationLevel: { maxValue: -30 },
    },
    {
      educationLevel: { maxValue: 100 },
      heartsPoint: { minValue: -20, maxValue: -20 },
      careLevel: { minValue: 500 },
      money: {},
    },
    newGameObj
  );

  expect(await getGameObj()).toBeNull();
});

test('applyMenuCharacteristic', async () => {
  applyMenuCharacteristic(
    { money: -100, heartsPoint: 100, mentalStrength: 200 },
    newGameObj
  );

  expect(await getGameObj()).toEqual({
    careLevel: 75,
    characterName: 'Sam',
    educationLevel: 25,
    gameLevel: 6,
    heartsPoint: 100,
    isDead: false,
    mentalStrength: 100,
    money: 4900,
    satietyLevel: 100,
  });
  applyMenuCharacteristic(
    { money: 600, mentalStrength: 200, educationLevel: -30 },
    newGameObj
  );
  // Not changed
  expect(await getGameObj()).toEqual({
    careLevel: 75,
    characterName: 'Sam',
    educationLevel: 25,
    gameLevel: 6,
    heartsPoint: 100,
    isDead: false,
    mentalStrength: 100,
    money: 4900,
    satietyLevel: 100,
  });
});
