export const getDateOfRegistration = (): Date => new Date();

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

export let gameObj: GameStatus | null = { ...newGameObj };

export const newGame = (characterName: string): boolean => {
  gameObj = { ...newGameObj, characterName };
  return true;
};

export const getGameObj = async (): Promise<GameStatus | null> => gameObj;

export const getUserAvatar = (): null => null;

export const setGameObj = (gameObject: GameStatus): void => {
  gameObj = gameObject.isDead ? null : gameObject;
};

interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
}
export interface CommentWithoutID {
  content: string;
  author: User;
}

export interface Comment extends CommentWithoutID {
  id: string;
}

export const subscribe = jest.fn();
export const unsubscribe = jest.fn();

export const subscribeOnCommentsOfQuiz = (
  quizID: string,
  callBackFunction: (comments: Comment[]) => void
): (() => void) => {
  callBackFunction(comments);
  return () => {
    return;
  };
};

const comments: Comment[] = [
  {
    content: 'Cool!',
    author: {
      uid: '473427398',
      displayName: 'Pedro',
    },
    id: '1qa',
  },
  {
    content: 'Awesome!',
    id: '2qa',
    author: {
      uid: '2w3e4r',
      displayName: 'Sebastian',
    },
  },
];

export const addComment = jest.fn();

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

export interface Quiz extends QuizWithoutID {
  id: string;
}
export const getQuiz = async (quizID: string): Promise<Quiz | undefined> => {
  return quiz;
};

const quiz: Quiz = {
  id: 'zjdejwljwfwfnwtrjktbtww',

  quizName: 'Exam',
  imageURL: '',
  likes: 5,

  author: { uid: '4', displayName: 'Artem' },

  answerVariants: [
    {
      name: 'Learn all',

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

  commentsCount: 1,
};

export const isPostLiked = jest.fn(async () => true);

export const getQuizzes = (): Quiz[] => [quiz];

export const likePost = jest.fn();
export const dislikePost = jest.fn();
