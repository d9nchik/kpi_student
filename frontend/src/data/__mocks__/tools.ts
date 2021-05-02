export interface Range {
  minValue?: number;
  maxValue?: number;
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
