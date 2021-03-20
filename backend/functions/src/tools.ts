import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

interface Range {
  minValue?: number;
  maxValue?: number;
}

interface Characteristic {
  heartsPoint?: Range;
  satietyLevel?: Range;
  mentalStrength?: Range;
  money?: Range;
  educationLevel?: Range;
  careLevel?: Range;
}

interface AnswerVariant {
  name: string;
  requirements: Characteristic;
  successProbability: number;
  successCharacteristics: Characteristic;
  loseCharacteristics: Characteristic;
}

interface Quiz {
  quizName: string;
  answerVariants: AnswerVariant[];
  imageURL?: string;
}

interface GameStatus {
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

const characteristicKeys = [
  'heartsPoint',
  'satietyLevel',
  'mentalStrength',
  'money',
  'educationLevel',
  'careLevel',
] as const;

export interface UserStatus {
  displayName?: string;
  email: string;
  photoURL?: string;
  registrationDate: admin.firestore.Timestamp;
  gameStatus: GameStatus | null;
  likedPurposes: string[];
}

export const getUserObj = async (uid: string): Promise<UserStatus | null> => {
  const userObj = await db.collection('users').doc(uid).get();
  if (!userObj.exists) {
    return null;
  }
  return userObj.data() as UserStatus;
};

export const getAllLikedQuizzes = async (): Promise<Quiz[]> => {
  try {
    const data = await db.collection('quizzes').where('likes', '>=', 10).get();
    return data.docs.map(doc => doc.data() as Quiz);
  } catch (error) {
    functions.logger.error(error);
    return [];
  }
};

export const getQuizWithSpecifiedRequirements = async (
  gameStatus: GameStatus
): Promise<Quiz> => {
  const likedQuizzes = await getAllLikedQuizzes();
  if (likedQuizzes.length === 0) {
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
  const availableQuizzes = likedQuizzes
    .map(quiz => filterAnswerVariants(quiz, gameStatus))
    .filter(answerVariantsNotLessThan2);

  const chosenObj = getRandomObj(availableQuizzes);
  chosenObj.answerVariants = chosenObj.answerVariants.slice(0, 4);

  return chosenObj;
};

export const filterAnswerVariants = (
  quiz: Quiz,
  gameStatus: GameStatus
): Quiz => {
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
}: Quiz): boolean => {
  return answerVariants.length >= 2;
};

export const getRandomObj = <T>(objects: T[]): T => {
  const index = Math.floor(Math.random() * objects.length);
  return objects[index];
};

export const dislikePost = (purposeID: string): void => {
  db.collection('quizzes')
    .doc(purposeID)
    .update({ likes: admin.firestore.FieldValue.increment(-1) });
};

export const likePost = (purposeID: string): void => {
  db.collection('quizzes')
    .doc(purposeID)
    .update({ likes: admin.firestore.FieldValue.increment(1) });
};

export const decrementPostCount = (purposeID: string): void => {
  db.collection('quizzes')
    .doc(purposeID)
    .update({ commentsCount: admin.firestore.FieldValue.increment(-1) });
};

export const incrementPostCount = (purposeID: string): void => {
  db.collection('quizzes')
    .doc(purposeID)
    .update({ commentsCount: admin.firestore.FieldValue.increment(1) });
};
