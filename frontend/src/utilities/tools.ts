import { getGameObj, setGameObj } from './dataStorage';
import quizzes from './menu.json';

const quizzesWithType = quizzes as Categories;

// Just look here:👉 https://gamedev.stackexchange.com/questions/110431/how-can-i-calculate-current-level-from-total-xp-when-each-level-requires-propor
const THRESHOLD = 50;

export interface LevelDescribe {
  level: number;
  currentXP: number;
  XPNeeded: number;
}

export function calculateLevel(gameLevel: number): LevelDescribe {
  const level = Math.floor(
    (1 + Math.sqrt(1 + (gameLevel * 8) / THRESHOLD)) / 2
  );

  const previousXPNeeded = calculateXPNeeded(level);
  const XPNeeded = calculateXPNeeded(level + 1) - previousXPNeeded;
  return { level, currentXP: gameLevel - previousXPNeeded, XPNeeded };
}

export function calculateXPNeeded(level: number): number {
  return Math.floor((level * (level - 1) * THRESHOLD) / 2);
}

export interface Characteristic {
  heartsPoint?: string | number;
  satietyLevel?: string | number;
  mentalStrength?: string | number;
  money?: string | number;
  educationLevel?: string | number;
  careLevel?: string | number;
}
export interface MenuItem {
  name: string;
  characteristics: Characteristic;
}

interface Categories {
  Общага: MenuItem[];
  Универ: MenuItem[];
  Работа: MenuItem[];
  Отдых: MenuItem[];
  Библиотека: MenuItem[];
  Магазин: MenuItem[];
}

export function getMenus(): Categories {
  return quizzesWithType;
}

export const applyMenuCharacteristic = (
  menuCharacteristic: Characteristic
): void => {
  const keys: (
    | 'heartsPoint'
    | 'satietyLevel'
    | 'mentalStrength'
    | 'money'
    | 'educationLevel'
    | 'careLevel'
  )[] = [
    'heartsPoint',
    'satietyLevel',
    'mentalStrength',
    'money',
    'educationLevel',
    'careLevel',
  ];

  const gameObj = getGameObj();
  if (!gameObj) {
    return;
  }

  const { level } = calculateLevel(gameObj.gameLevel);

  // check if operation is valid
  for (const key of keys) {
    const characteristicValue = menuCharacteristic[key];
    if (characteristicValue) {
      const number = parseMenuCharacteristic(characteristicValue, level);
      if (gameObj[key] < -number) {
        return;
      }

      gameObj[key] += number;
      if (key !== 'money' && gameObj[key] > level * 100)
        gameObj[key] = level * 100;
    }
  }
  //FIXME: game level should be enlarged
  setGameObj(gameObj);
};

function parseMenuCharacteristic(
  characteristic: number | string,
  level: number
): number {
  if (typeof characteristic === 'number') {
    return characteristic;
  }
  const numberPart = Number(characteristic.slice(0, characteristic.length - 1));
  if (Number.isNaN(numberPart)) {
    return 0;
  }
  return numberPart * level;
}
