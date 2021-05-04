export interface Range {
  minValue?: number;
  maxValue?: number;
}
export interface CharacteristicMenuItem {
  heartsPoint?: string | number;
  satietyLevel?: string | number;
  mentalStrength?: string | number;
  money?: string | number;
  educationLevel?: string | number;
  careLevel?: string | number;
}
export interface MenuItem {
  name: string;
  characteristics: CharacteristicMenuItem;
}

interface Categories {
  hostel: MenuItem[];
  university: MenuItem[];
  work: MenuItem[];
  relax: MenuItem[];
  library: MenuItem[];
  shop: MenuItem[];
}

export interface Characteristic {
  heartsPoint?: Range;
  satietyLevel?: Range;
  mentalStrength?: Range;
  money?: Range;
  educationLevel?: Range;
  careLevel?: Range;
}

export interface AnswerVariant {
  name: string;
  requirements: Characteristic;
  successProbability: number;
  successCharacteristics: Characteristic;
  loseCharacteristics: Characteristic;
}

export interface QuizWithOnlyBody {
  quizName: string;
  answerVariants: AnswerVariant[];
  imageURL?: string;
}
export const applyQuizVariantItem = jest.fn();
export const applyMenuCharacteristic = jest.fn();
export const getDayInUniversity = (): string => '2 days';

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

export const getMenus = (): Categories => ({
  relax: [
    {
      name: 'Play UNO',
      characteristics: { money: -100, mentalStrength: 30 },
    },
    {
      name: 'dance Hip-Hop',
      characteristics: { mentalStrength: 40, satietyLevel: -35 },
    },
  ],
  hostel: [],
  shop: [],
  library: [],
  university: [],
  work: [],
});

export const getQuizWithSpecifiedRequirements = (): QuizWithOnlyBody => ({
  quizName: 'Summary week',

  answerVariants: [
    {
      name: 'Learn everything',

      requirements: { educationLevel: { minValue: 700 } },

      successProbability: 1,

      successCharacteristics: {
        educationLevel: { minValue: 300, maxValue: 500 },
      },

      loseCharacteristics: {
        educationLevel: { minValue: 50, maxValue: 100 },

        heartsPoint: { minValue: -20, maxValue: -50 },
      },
    },
    {
      name: 'Learn half',

      requirements: { educationLevel: { minValue: 300 } },

      successProbability: 0.5,

      successCharacteristics: {
        educationLevel: { minValue: 100, maxValue: 200 },
      },

      loseCharacteristics: {
        educationLevel: { minValue: 30, maxValue: 40 },

        heartsPoint: { minValue: -20, maxValue: -50 },
      },
    },
  ],
});

export const characteristicKeys = [
  'heartsPoint',
  'satietyLevel',
  'mentalStrength',
  'money',
  'educationLevel',
  'careLevel',
] as const;
