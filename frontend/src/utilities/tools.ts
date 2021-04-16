import {
  setGameObj as setGameStatus,
  QuizWithOnlyBody,
  GameStatus,
  Characteristic as CharacteristicRange,
  getDateOfRegistration,
} from './dataStorage';
import quizzes from './menu.json';
import { getUser } from './auth';

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
  hostel: MenuItem[];
  university: MenuItem[];
  work: MenuItem[];
  relax: MenuItem[];
  library: MenuItem[];
  shop: MenuItem[];
}

export function getMenus(): Categories {
  return quizzesWithType;
}

export const characteristicKeys: (
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

const setGameObj = (gameStatus: GameStatus, level: number) => {
  for (const key of characteristicKeys) {
    if (key !== 'money' && gameStatus[key] > level * 100)
      gameStatus[key] = level * 100;
    if (
      (key === 'money' && gameStatus[key] < -5000) ||
      (key !== 'money' && gameStatus[key] < 0)
    ) {
      gameStatus.isDead = true;
      setGameStatus(gameStatus);
      return;
    }
  }

  setGameStatus(gameStatus);
};

export const applyMenuCharacteristic = (
  menuCharacteristic: Characteristic,
  gameObj: GameStatus
): void => {
  const newGameObj = { ...gameObj };
  const { level, XPNeeded } = calculateLevel(newGameObj.gameLevel);

  // check if operation is valid
  for (const key of characteristicKeys) {
    const characteristicValue = menuCharacteristic[key];
    if (characteristicValue) {
      const number = parseMenuCharacteristic(characteristicValue, level);
      if (newGameObj[key] < -number) {
        return;
      }

      newGameObj[key] += number;
    }
  }

  // enlarge game level
  newGameObj.gameLevel += XPNeeded * 0.1;

  setGameObj(newGameObj, level);
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

export const getQuizWithSpecifiedRequirements = async (): Promise<QuizWithOnlyBody> => {
  const user = getUser();
  if (!user) {
    return { quizName: 'Empty', answerVariants: [] };
  }
  console.log(JSON.stringify({ data: { uid: user.uid } }));
  const answer = await fetch(
    'https://europe-west3-kpi-student.cloudfunctions.net/getRandomQuiz',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { uid: user.uid } }),
    }
  );
  return (await answer.json()) as QuizWithOnlyBody;
};

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
  const { XPNeeded, level } = calculateLevel(newGameObj.gameLevel);
  newGameObj.gameLevel += XPNeeded * 0.25;
  setGameObj(newGameObj, level);
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

export function getStringifiedDays(dayNumber: number): string {
  const preLastDigit = (dayNumber % 100) / 10;

  if (preLastDigit === 1) {
    return 'дней';
  }

  switch (dayNumber % 10) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
}

function differenceBetweenTwoDatesInDays(
  firstDate: Date,
  secondDate: Date
): number {
  return Math.floor(
    (firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24)
  );
}

export const getDayInUniversity = (): number =>
  differenceBetweenTwoDatesInDays(new Date(), getDateOfRegistration()) + 1;
