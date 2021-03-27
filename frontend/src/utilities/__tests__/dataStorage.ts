import {
  getQuizzes,
  getCommentsOfQuiz,
  addQuiz,
  QuizWithOnlyBody,
  removeQuiz,
  addComment,
  removeComment,
  likePost,
  dislikePost,
} from '../dataStorage';

it('test getQuizzes', () => {
  const quizzes = getQuizzes();
  expect(quizzes.length).toBe(1);
  const firstQuiz = quizzes[0];
  expect(firstQuiz.quizName).toBe('Organize a party');
  expect(firstQuiz.author.displayName).toBe('Andrew');
  expect(firstQuiz.answerVariants.length).toBe(1);
  expect(getQuizzes(1).length).toBe(0);
});

it('test getCommentsOfQuiz', () => {
  const quizID = getQuizzes()[0].id;
  const commentsOfQuiz = getCommentsOfQuiz(quizID);
  expect(commentsOfQuiz.length).toBe(1);
  const firstComment = commentsOfQuiz[0];
  expect(firstComment.content).toBe('I like this idea');
  expect(firstComment.author.photoURL).toBeUndefined();
  expect(firstComment.author.uid).toBe('1');
});

const quiz: QuizWithOnlyBody = {
  quizName: 'Test of adding quiz',
  answerVariants: [
    {
      name: 'Lie to friend',
      requirements: { educationLevel: { minValue: 100, maxValue: 150 } },
      successProbability: 0.75,
      successCharacteristics: { money: { minValue: 600, maxValue: 3000 } },
      loseCharacteristics: {
        educationLevel: { minValue: -100, maxValue: -50 },
      },
    },

    {
      name: 'Say truth to friend',
      requirements: { mentalStrength: { minValue: 160, maxValue: 200 } },
      successProbability: 0.15,
      successCharacteristics: { money: { minValue: 300, maxValue: 1500 } },
      loseCharacteristics: {
        mentalStrength: { minValue: -160, maxValue: -100 },
      },
    },
  ],
  imageURL: 'default_img',
};

it('test addQuiz', () => {
  expect(addQuiz(quiz)).toBeTruthy();
  const ourQuiz = getQuizzes()[1];
  expect(ourQuiz.commentsCount).toBe(0);
  expect(ourQuiz.likes).toBe(0);
  expect(ourQuiz.quizName).toBe(quiz.quizName);
  expect(ourQuiz.answerVariants).toEqual(quiz.answerVariants);
  expect(getCommentsOfQuiz(ourQuiz.id).length).toBe(0);
});

it('test removeQuiz', () => {
  let quizzes = getQuizzes();
  expect(quizzes.length).toBe(2);
  const secondQuiz = quizzes[1];
  expect(removeQuiz('65gy5y57ty57t5')).toBeFalsy();
  expect(removeQuiz(secondQuiz.id)).toBeTruthy();
  quizzes = getQuizzes();
  expect(quizzes.length).toBe(1);
  const firstQuiz = quizzes[0];
  expect(firstQuiz.quizName).toBe('Organize a party');
});

it('test addComment', () => {
  let firstQuiz = getQuizzes()[0];
  expect(firstQuiz.commentsCount).toBe(1);
  expect(addComment('frhfjerhfjerhfvcvehj', 'nice dude')).toBeFalsy();
  const commentContent = 'nice weather';
  expect(addComment(firstQuiz.id, commentContent)).toBeTruthy();
  firstQuiz = getQuizzes()[0];
  expect(firstQuiz.commentsCount).toBe(2);
  const comments = getCommentsOfQuiz(firstQuiz.id);
  expect(comments.length).toBe(2);
  expect(comments[1].content).toBe(commentContent);
});

it('test removeComment', () => {
  let firstQuiz = getQuizzes()[0];
  expect(firstQuiz.commentsCount).toBe(2);
  let comments = getCommentsOfQuiz(firstQuiz.id);
  expect(comments.length).toBe(2);
  expect(removeComment('nfkejrfjerrjkghre', '1278')).toBeFalsy();
  expect(removeComment(firstQuiz.id, '1278')).toBeFalsy();
  expect(removeComment(firstQuiz.id, comments[1].id)).toBeTruthy();
  firstQuiz = getQuizzes()[0];
  expect(firstQuiz.commentsCount).toBe(1);
  comments = getCommentsOfQuiz(firstQuiz.id);
  expect(comments.length).toBe(1);
  const firstComment = comments[0];
  expect(firstComment.content).toBe('I like this idea');
});

it('test likePost', () => {
  let firstQuiz = getQuizzes()[0];
  expect(firstQuiz.likes).toBe(5);
  expect(likePost('23h1231iu2gbdbqjh324')).toBeFalsy();
  expect(likePost(firstQuiz.id)).toBeTruthy();
  firstQuiz = getQuizzes()[0];
  expect(firstQuiz.likes).toBe(6);
});

it('test', () => {
  let firstQuiz = getQuizzes()[0];
  expect(firstQuiz.likes).toBe(6);
  expect(dislikePost('48394j843hhfr8h483534')).toBeFalsy();
  expect(dislikePost(firstQuiz.id)).toBeTruthy();
  firstQuiz = getQuizzes()[0];
  expect(firstQuiz.likes).toBe(5);
});