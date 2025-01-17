import { getUser } from './auth';
import firebase, { storage, firestore as db, auth } from '../firebase';
import { characteristicKeys } from './tools';

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

export interface QuizWithoutID extends QuizWithOnlyBody {
  author: User;
  likes: number;
  commentsCount: number;
  imageURL: string;
}

export interface Quiz extends QuizWithoutID {
  id: string;
}

export const getQuizzes = async (pageNumber = 1): Promise<Quiz[]> => {
  try {
    const first = await db
      .collection('quizzes')
      .orderBy('quizName')
      .limit(10 * pageNumber)
      .get();
    return first.docs.map(mapperDocsWithId) as Quiz[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

function mapperDocsWithId(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) {
  return { ...doc.data(), id: doc.id };
}
export const getQuiz = async (quizID: string): Promise<Quiz | undefined> => {
  const doc = await db.collection('quizzes').doc(quizID).get();
  return doc.data() as Quiz | undefined;
};

export interface CommentWithoutID {
  content: string;
  author: User;
}

export interface Comment extends CommentWithoutID {
  id: string;
}

export const subscribeOnCommentsOfQuiz = (
  quizID: string,
  callBackFunction: (comments: Comment[]) => void
): (() => void) =>
  db
    .collection('quizzes')
    .doc(quizID)
    .collection('comments')
    .onSnapshot(async doc => {
      const data = (await doc.docs.map(mapperDocsWithId)) as Comment[];
      callBackFunction(data);
    });

export const addQuiz = async ({
  quizName,
  imageURL,
  answerVariants,
}: QuizWithOnlyBody): Promise<boolean> => {
  const user = getUser();

  if (!user) {
    return false;
  }

  const { uid, displayName, photoURL } = user;

  const quizNormalized: QuizWithoutID = {
    quizName,
    likes: 0,
    commentsCount: 0,
    author: {
      uid,
    },
    imageURL: '',
    answerVariants: answerVariants.map(mapAnswerVarianToWithoutUndefined),
  };

  if (displayName) {
    quizNormalized.author.displayName = displayName;
  }

  if (photoURL) {
    quizNormalized.author.photoURL = photoURL;
  }

  if (imageURL) {
    quizNormalized.imageURL = imageURL;
  }

  await db.collection('quizzes').add(quizNormalized);
  return true;
};

export function mapAnswerVarianToWithoutUndefined({
  loseCharacteristics,
  requirements,
  successCharacteristics,
  name,
  successProbability,
}: AnswerVariant): AnswerVariant {
  const newLoseCharacteristics: Characteristic = {};
  const newSuccessCharacteristics: Characteristic = {};
  const newRequirements: Characteristic = {};

  for (const key of characteristicKeys) {
    const loseCharacteristic = loseCharacteristics[key];
    if (loseCharacteristic) {
      newLoseCharacteristics[key] = removeUndefinedFromRange(
        loseCharacteristic
      );
    }
    const requirementCharacteristic = requirements[key];
    if (requirementCharacteristic) {
      newRequirements[key] = removeUndefinedFromRange(
        requirementCharacteristic
      );
    }
    const successCharacteristic = successCharacteristics[key];
    if (successCharacteristic) {
      newSuccessCharacteristics[key] = removeUndefinedFromRange(
        successCharacteristic
      );
    }
  }

  return {
    name,
    successProbability,
    loseCharacteristics: newLoseCharacteristics,
    successCharacteristics: newSuccessCharacteristics,
    requirements: newRequirements,
  };
}

export function removeUndefinedFromRange({ minValue, maxValue }: Range): Range {
  const newRange: Range = {};
  if (minValue) {
    newRange.minValue = minValue;
  }
  if (maxValue) {
    newRange.maxValue = maxValue;
  }
  return newRange;
}

export const removeQuiz = async (quizID: string): Promise<boolean> => {
  try {
    await db.collection('quizzes').doc(quizID).delete();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addComment = async (
  quizID: string,
  content: string
): Promise<boolean> => {
  const user = getUser();
  if (!user) {
    return false;
  }

  const { uid, photoURL, displayName } = user;
  try {
    const commentWithoutID: CommentWithoutID = {
      content,
      author: { uid },
    };

    if (photoURL) {
      commentWithoutID.author.photoURL = photoURL;
    }

    if (displayName) {
      commentWithoutID.author.displayName = displayName;
    }

    await db
      .collection('quizzes')
      .doc(quizID)
      .collection('comments')
      .add(commentWithoutID);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeComment = async (
  quizID: string,
  commentID: string
): Promise<boolean> => {
  try {
    await db
      .collection('quizzes')
      .doc(quizID)
      .collection('comments')
      .doc(commentID)
      .delete();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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

  const checkedGameStatus = gameStatus.isDead ? null : gameStatus;
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update({ gameStatus: checkedGameStatus });
  } catch (error) {
    console.error(error);
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

interface UserStatus {
  displayName?: string;
  email: string;
  photoURL?: string;
  registrationDate: firebase.firestore.Timestamp;
  gameStatus: GameStatus | null;
  likedPurposes: string[];
}

let unsubscribeFromDataChange: null | (() => void) = null;
let userData: undefined | UserStatus | null = null;

auth.onAuthStateChanged(user => {
  if (!user) {
    if (unsubscribeFromDataChange) unsubscribeFromDataChange();
    return;
  }

  unsubscribeFromDataChange = db
    .collection('users')
    .doc(user.uid)
    .onSnapshot(doc => {
      userData = doc.data() as UserStatus;

      if (subscriber) {
        subscriber();
      }
    });
});

export const isPostLiked = (quizID: string): boolean => {
  if (!userData) {
    return false;
  }

  return userData.likedPurposes.includes(quizID);
};

export const likePost = async (quizID: string): Promise<boolean> => {
  const user = getUser();

  if (!user || isPostLiked(quizID)) {
    return false;
  }

  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update({
        likedPurposes: firebase.firestore.FieldValue.arrayUnion(quizID),
      });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const dislikePost = async (quizID: string): Promise<boolean> => {
  const user = getUser();
  if (!user || !isPostLiked(quizID)) {
    return false;
  }

  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update({
        likedPurposes: firebase.firestore.FieldValue.arrayRemove(quizID),
      });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getGameObj = async (): Promise<GameStatus | null | undefined> => {
  const user = getUser();
  if (!user) {
    return null;
  }

  if (userData === null) {
    return undefined;
  }

  if (userData) {
    return userData.gameStatus;
  }

  await initializeUser();
  return null;
};

export const getDateOfRegistration = (): Date => {
  if (!userData) {
    return new Date();
  }

  return userData.registrationDate.toDate();
};

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

// TODO: give ability to remove quizzes and comments + add avatar on comment
