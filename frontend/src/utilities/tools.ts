import {
  getGameObj,
  setGameObj as setGameStatus,
  QuizWithOnlyBody,
  getAllQuizzes,
  GameStatus,
  Characteristic as CharacteristicRange,
} from './dataStorage';
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

const characteristicKeys: (
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

const setGameObj = (gameStatus: GameStatus) => {
  const { level } = calculateLevel(gameStatus.gameLevel);
  for (const key of characteristicKeys) {
    if (key !== 'money' && gameStatus[key] > level * 100)
      gameStatus[key] = level * 100;
  }
  setGameStatus(gameStatus);
};

export const applyMenuCharacteristic = (
  menuCharacteristic: Characteristic
): void => {
  const gameObj = getGameObj();
  if (!gameObj) {
    return;
  }

  const { level } = calculateLevel(gameObj.gameLevel);

  // check if operation is valid
  for (const key of characteristicKeys) {
    const characteristicValue = menuCharacteristic[key];
    if (characteristicValue) {
      const number = parseMenuCharacteristic(characteristicValue, level);
      if (gameObj[key] < -number) {
        return;
      }

      gameObj[key] += number;
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

export const getQuizWithSpecifiedRequirements = (
  gameStatus: GameStatus
): QuizWithOnlyBody => {
  const availableQuizzes = getAllQuizzes()
    .map(quiz => {
      const availableAnswers = quiz.answerVariants.filter(
        ({ requirements }) => {
          for (const key of characteristicKeys) {
            const range = requirements[key];
            if (!range || (!range.minValue && !range.maxValue)) {
              continue;
            }

            if (
              (range.maxValue && range.maxValue < gameStatus[key]) ||
              (range.minValue && range.minValue > gameStatus[key])
            ) {
              return false;
            }
          }
          return true;
        }
      );
      const copy = { ...quiz };
      copy.answerVariants = availableAnswers;
      return copy;
    })
    .filter(({ answerVariants }) => answerVariants.length >= 2);

  return getRandomObj(availableQuizzes);
};

export function getRandomObj<T>(objects: T[]): T {
  const index = Math.floor(Math.random() * objects.length);
  return objects[index];
}

export const applyQuizVariantItem = (
  successProbability: number,
  successCharacteristics: CharacteristicRange,
  loseCharacteristics: CharacteristicRange,
  gameObj: GameStatus
): void => {
  const newGameObj = { ...gameObj };

  const characteristics =
    Math.random() > successProbability
      ? loseCharacteristics
      : successCharacteristics;

  for (const key of characteristicKeys) {
    const characteristic = characteristics[key];
    if (
      !characteristic ||
      (!characteristic.minValue && !characteristic.maxValue)
    ) {
      continue;
    }
    const { minValue, maxValue } = characteristic;

    const applyNumber = (() => {
      if (!minValue) {
        return maxValue;
      }
      if (!maxValue) {
        return minValue;
      }
      return randomRangeValue(minValue, maxValue);
    })();
    if (!applyNumber) continue;

    newGameObj[key] += applyNumber;
  }
  setGameObj(newGameObj);
};

/**
 *
 * @param min inclusive
 * @param max inclusive
 * @returns
 */
export function randomRangeValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
