import data from './quizzes.json';

const dataWithTypes = data as QuizWithComment[];

const DEFAULT_IMAGE_URL = '../logo.svg';

const author = { uid: '098123', displayName: 'test-admin' };

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

export const getQuizzes = (pageNumber = 0): Quiz[] => {
  const startingQuiz = pageNumber * 10;
  return dataWithTypes.slice(startingQuiz, startingQuiz + 10).map(item => {
    return { ...item, imageURL: DEFAULT_IMAGE_URL };
  });
};

interface Comment {
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

export const likePost = (quizID: string): boolean => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  quizWithCommentsObj.likes++;
  return true;
};

export const dislikePost = (quizID: string): boolean => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  quizWithCommentsObj.likes--;
  return true;
};

function generateRandomID(): string {
  return String(Date.now());
}

function getQuizWithComment(quizID: string) {
  return dataWithTypes.find(({ id }) => quizID === id);
}
