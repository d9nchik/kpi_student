import {
  addQuiz,
  AnswerVariant,
  QuizWithOnlyBody,
  removeUndefinedFromRange,
  mapAnswerVarianToWithoutUndefined,
} from '../dataStorage';
import { loginWithEmail } from '../auth';

jest.mock('../auth.ts');
jest.mock('../../firebase.ts');

const typedQuizzes: QuizWithOnlyBody = {
  quizName: 'Зачетная неделя',

  answerVariants: [
    {
      name: 'Выучить все',

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
      name: 'Выучить половину',

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
    {
      name: 'Ничего не учить, но крикнуть в полночь на поляне Халява Прийди!!!',

      requirements: { educationLevel: { minValue: 0 } },

      successProbability: 1,

      successCharacteristics: {
        educationLevel: { minValue: 100, maxValue: 200 },

        heartsPoint: { minValue: 600, maxValue: 800 },
      },

      loseCharacteristics: {
        educationLevel: { minValue: 30, maxValue: 40 },

        heartsPoint: { minValue: -100, maxValue: -200 },
      },
    },
    {
      name: 'Дать взятку',

      requirements: { money: { minValue: 5000 } },

      successProbability: 0.8,

      successCharacteristics: {
        money: { minValue: -5000, maxValue: -7000 },
      },

      loseCharacteristics: {
        money: { minValue: -5000, maxValue: -7000 },

        heartsPoint: { minValue: -100, maxValue: -200 },
      },
    },
    {
      name: 'Не прийти на сдачу',

      requirements: {},

      successProbability: 1,

      successCharacteristics: {},

      loseCharacteristics: {},
    },
  ],
};

const email = 'smer@gmail.com';
const password = '1qaaz2wsx3edc';

describe('dataStorage', () => {
  afterAll(async () => {
    await fetch(
      'http://localhost:8080/emulator/v1/projects/kpi-student/databases/(default)/documents',
      { method: 'DELETE' }
    );
  });

  test('addQuiz', async () => {
    expect(await addQuiz(typedQuizzes)).toBeFalsy();
    await loginWithEmail(email, password);
    // expect((await getQuizzes()).length).toBe(0);
    expect(await addQuiz(typedQuizzes)).toBeTruthy();
  });

  test('mapAnswerVariantToWithoutUndefined', () => {
    const answerVariantWithUndefined: AnswerVariant = {
      successCharacteristics: {
        satietyLevel: { minValue: -100, maxValue: undefined },
      },
      loseCharacteristics: {
        educationLevel: { maxValue: 100, minValue: undefined },
      },
      requirements: {
        money: { minValue: 100, maxValue: 300 },
      },
      successProbability: 1,
      name: 'Impossible',
    };
    const answerVariantsWithoutUndefined: AnswerVariant = {
      successCharacteristics: {
        satietyLevel: { minValue: -100 },
      },
      loseCharacteristics: {
        educationLevel: { maxValue: 100 },
      },
      requirements: {
        money: { minValue: 100, maxValue: 300 },
      },
      successProbability: 1,
      name: 'Impossible',
    };
    expect(
      mapAnswerVarianToWithoutUndefined(answerVariantWithUndefined)
    ).toStrictEqual(answerVariantsWithoutUndefined);
  });

  test('removeUndefinedFromRange', () => {
    expect(removeUndefinedFromRange({})).toStrictEqual({});
    expect(
      removeUndefinedFromRange({ minValue: undefined, maxValue: undefined })
    ).toStrictEqual({});
    expect(
      removeUndefinedFromRange({ minValue: 1000, maxValue: undefined })
    ).toStrictEqual({ minValue: 1000 });
  });

  //   test('subscribe', async () => {
  //     let check = false;
  //     subscribe(() => {
  //       check = true;
  //     });

  //     await initializeUser();

  //     await setGameObj({
  //       isDead: true,
  //       money: 0,
  //       educationLevel: 0,
  //       satietyLevel: 0,
  //       careLevel: 0,
  //       characterName: 'incognito',
  //       heartsPoint: 0,
  //       mentalStrength: 0,
  //       gameLevel: 2,
  //     });
  //     expect(check).toBeTruthy();
  //   });
});
