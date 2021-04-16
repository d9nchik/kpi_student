import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

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

export interface QuizWithoutID extends QuizWithOnlyBody {
  author: User;
  likes: number;
  commentsCount: number;
  imageURL: string;
}

export interface GameStatus {
  gameLevel: number;
  characterName: string;
  heartsPoint: number;
  satietyLevel: number;
  mentalStrength: number;
  money: number;
  educationLevel: number;
  careLevel: number;
  isDead: boolean;
}

export interface Quiz extends QuizWithoutID {
  id: string;
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

export const getAllLikedQuizzes = async (): Promise<Quiz[]> => {
  try {
    const data = await db.collection('quizzes').where('likes', '>=', 10).get();
    return data.docs.map(mapperDocsWithId);
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const mapperDocsWithId = (
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Quiz => {
  return { ...doc.data(), id: doc.id } as Quiz;
};

export const getQuizWithSpecifiedRequirements = async (
  gameStatus: GameStatus
): Promise<QuizWithOnlyBody> => {
  try {
    const availableQuizzes = (await getAllLikedQuizzes())
      .map(quiz => filterAnswerVariants(quiz, gameStatus))
      .filter(answerVariantsNotLessThan2);

    const chosenObj = getRandomObj(availableQuizzes);
    chosenObj.answerVariants = chosenObj.answerVariants.slice(0, 4);

    return chosenObj;
  } catch (error) {
    console.error(error);
    return {
      quizName: 'Oops, no Quiz!',
      answerVariants: [
        {
          name: 'Okay',
          requirements: {},
          successCharacteristics: {},
          loseCharacteristics: {},
          successProbability: 1,
        },
      ],
    };
  }
};

export const filterAnswerVariants = (
  quiz: QuizWithOnlyBody,
  gameStatus: GameStatus
): QuizWithOnlyBody => {
  const availableAnswers = quiz.answerVariants.filter(({ requirements }) => {
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
  });
  const copy = { ...quiz };
  copy.answerVariants = availableAnswers;
  return copy;
};

export const answerVariantsNotLessThan2 = ({
  answerVariants,
}: QuizWithOnlyBody): boolean => {
  return answerVariants.length >= 2;
};

export const getRandomObj = <T>(objects: T[]): T => {
  const index = Math.floor(Math.random() * objects.length);
  return objects[index];
};
