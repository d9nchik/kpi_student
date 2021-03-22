import data from './quizzes.json';

const dataWithTypes = data as QuizWithComment[];

const DEFAULT_IMAGE_URL = '../logo.svg';

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

interface QuizWithoutId {
  quizName: string;
  likes: number;
  author: User;
  answerVariants: AnswerVariant[];
  commentsCount: number;
  imageURL: string;
}

interface Quiz extends QuizWithoutId {
  id: string;
}

export const getQuizzes = (pageNumber = 0): Quiz[] => {
  const startingQuiz = pageNumber * 10;
  return dataWithTypes.slice(startingQuiz, startingQuiz + 10).map(item => {
    return { ...item, imageURL: DEFAULT_IMAGE_URL };
  });
};

interface CommentWithoutID {
  content: string;
  author: User;
}

interface Comment extends CommentWithoutID {
  id: string;
}

interface QuizWithComment extends Quiz {
  comments: Comment[];
}

export const getCommentsOfQuiz = (quizID: string): Comment[] => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  return quizWithCommentsObj ? quizWithCommentsObj.comments : [];
};

export const addQuiz = (quiz: QuizWithoutId): boolean => {
  const id = generateRandomID();
  dataWithTypes.push({ ...quiz, id, comments: [] });
  return true;
};

export const addComment = (
  quizID: string,
  comment: CommentWithoutID
): boolean => {
  const quizWithCommentsObj = getQuizWithComment(quizID);
  if (!quizWithCommentsObj) {
    return false;
  }
  const id = generateRandomID();
  quizWithCommentsObj.comments.push({ ...comment, id });
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

  commentsObj.splice(indexOfComment, 1);
  return true;
};

function generateRandomID(): string {
  return String(Date.now());
}

function getQuizWithComment(quizID: string) {
  return dataWithTypes.find(({ id }) => quizID === id);
}
