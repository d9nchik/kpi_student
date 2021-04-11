import data from './quizzes.json';
import { getUser } from './auth';
import firebase from 'firebase';
import { storage, firestore as db } from '../firebase';

const dataWithTypes = data as QuizWithComment[];

const DEFAULT_IMAGE_URL = '../logo.svg';
const DATE_OF_REGISTRATION_KEY = 'DATE_OF_REGISTRATION';
const author = { uid: '098123', displayName: 'test-admin' };

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

interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

export interface QuizWithOnlyBody {
  quizName: string;
  answerVariants: AnswerVariant[];
  imageURL?: string;
}

interface Quiz extends QuizWithOnlyBody {
  id: string;
  author: User;
  likes: number;
  commentsCount: number;
  imageURL: string;
}

export const getAllQuizzes = (): Quiz[] => dataWithTypes;

export const getQuizzes = (pageNumber = 0): Quiz[] => {
  const startingQuiz = pageNumber * 10;
  return getAllQuizzes()
    .slice(startingQuiz, startingQuiz + 10)
    .map(item => {
      return { ...item, imageURL: DEFAULT_IMAGE_URL };
    });
};

export const getQuiz = (quizID: string): Quiz | undefined => {
  return getQuizWithComment(quizID);
};

export interface Comment {
  id: string;
  content: string;
  author: User;
}

interface QuizWithComment extends Quiz {
  comments: Comment[];
}

export const getCommentsOfQuiz = (quizID: string): Comment[] => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  return quizWithCommentsObj ? quizWithCommentsObj.comments : [];
};

export const addQuiz = (quiz: QuizWithOnlyBody): boolean => {
  const id = generateRandomID();
  const quizWithBody: QuizWithComment = {
    ...quiz,
    id,
    comments: [],
    likes: 0,
    commentsCount: 0,
    imageURL: DEFAULT_IMAGE_URL,
    author,
  };
  if (quiz.imageURL) {
    quizWithBody.imageURL = quiz.imageURL;
  }
  dataWithTypes.push(quizWithBody);
  return true;
};

export const addComment = (quizID: string, content: string): boolean => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  quizWithCommentsObj.commentsCount++;
  const id = generateRandomID();
  quizWithCommentsObj.comments.push({ content, id, author });
  return true;
};

export const removeQuiz = (quizID: string): boolean => {
  const quizWithCommentsID = dataWithTypes.findIndex(({ id }) => quizID === id);
  if (quizWithCommentsID === -1) {
    return false;
  }
  dataWithTypes.splice(quizWithCommentsID, 1);
  return true;
};

export const removeComment = (quizID: string, commentID: string): boolean => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  const commentsObj = quizWithCommentsObj.comments;
  const indexOfComment = commentsObj.findIndex(({ id }) => commentID === id);
  if (indexOfComment === -1) {
    return false;
  }

  quizWithCommentsObj.commentsCount--;
  commentsObj.splice(indexOfComment, 1);
  return true;
};

const likedPost: string[] = [];

export const isPostLiked = (quizID: string): boolean => {
  return likedPost.includes(quizID);
};

export const likePost = (quizID: string): boolean => {
  if (isPostLiked(quizID)) {
    return false;
  }

  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  quizWithCommentsObj.likes++;
  likedPost.push(quizID);
  return true;
};

export const dislikePost = (quizID: string): boolean => {
  if (!isPostLiked(quizID)) {
    return false;
  }

  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  quizWithCommentsObj.likes--;
  likedPost.splice(likedPost.indexOf(quizID), 1);
  return true;
};

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

export const newGameObj: GameStatus = {
  gameLevel: 1,
  characterName: 'Sam',
  heartsPoint: 100,
  satietyLevel: 100,
  mentalStrength: 100,
  money: 5000,
  educationLevel: 25,
  careLevel: 75,
  isDead: false,
};

let subscriber: (() => void) | null = null;

export const subscribe = (newSubscriber: () => void): void => {
  subscriber = newSubscriber;
};

export const unsubscribe = (): void => {
  subscriber = null;
};

export const setGameObj = async (gameStatus: GameStatus): Promise<void> => {
  const user = getUser();
  if (!user) {
    return;
  }

  await (async () => {
    const checkedGameStatus = gameStatus.isDead ? null : gameStatus;
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .update({ gameStatus: checkedGameStatus });
    } catch (error) {
      console.error(error);
    }
  })();
  if (subscriber) {
    subscriber();
  }
};

export const newGame = (characterName: string): boolean => {
  setGameObj({ ...newGameObj, characterName });
  return true;
};

export const initializeUser = async (): Promise<boolean> => {
  const user = getUser();
  if (!user) {
    return false;
  }

  try {
    const { displayName, email, photoURL } = user;
    await db.collection('users').doc(user.uid).set({
      displayName,
      email,
      photoURL,
      registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
      gameStatus: null,
      likedPurposes: [],
    });
    return true;
  } catch (error) {
    console.error(`Error setting document: ${error}`);
    return false;
  }
};

export const getGameObj = async (): Promise<GameStatus | null> => {
  const user = getUser();
  if (!user) {
    return null;
  }

  try {
    const doc = await db.collection('users').doc(user.uid).get();

    if (!doc.exists) {
      await initializeUser();
      return null;
    }

    const data = doc.data();
    if (!data) {
      return null;
    }
    return data.gameStatus;
  } catch (error) {
    console.error(`Error getting document: ${error}`);
    return null;
  }
};

function generateRandomID(): string {
  return String(Date.now());
}

function getQuizWithComment(quizID: string) {
  return dataWithTypes.find(({ id }) => quizID === id);
}

const date_of_registration: Date = (() => {
  const localStorageItem = localStorage.getItem(DATE_OF_REGISTRATION_KEY);
  if (!localStorageItem) {
    const date = new Date();
    localStorage.setItem(DATE_OF_REGISTRATION_KEY, JSON.stringify(date));
    return date;
  }

  return new Date(JSON.parse(localStorageItem));
})();

function differenceBetweenTwoDatesInDays(
  firstDate: Date,
  secondDate: Date
): number {
  return Math.floor(
    (firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24)
  );
}

export const getDayInUniversity = (): number =>
  differenceBetweenTwoDatesInDays(new Date(), date_of_registration) + 1;

export const uploadImage = async (image: File): Promise<string> => {
  const user = getUser();
  if (!user) {
    return '';
  }
  try {
    const response = await storage
      .ref()
      .child('game-quizzes-photos')
      .child(user.uid)
      .child(`${new Date().getTime()} ${image.name}`)
      .put(image);
    return await response.ref.getDownloadURL();
  } catch (error) {
    return '';
  }
};

export const getUserAvatar = (): string | null => {
  const user = getUser();
  if (!user) {
    return null;
  }
  return user.photoURL;
};
