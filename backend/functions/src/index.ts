import * as functions from 'firebase-functions';
import {
  decrementPostCount,
  dislikePost,
  getQuizWithSpecifiedRequirements,
  getUserObj,
  incrementPostCount,
  likePost,
  UserStatus,
} from './tools';

const REGION = 'europe-west3';

export const getRandomQuiz = functions
  .region(REGION)
  .https.onRequest(async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    if (!req.body || !req.body.data || typeof req.body.data.uid !== 'string') {
      functions.logger.error('Missing body!');
      res.sendStatus(200);
      return;
    }

    functions.logger.log(`rawBody = ${String(req.rawBody)}`);

    const uid: string = req.body.data.uid;
    const userObj = await getUserObj(uid);
    if (!userObj || !userObj.gameStatus) {
      res.sendStatus(404);
      functions.logger.warn(`Invalid uid: ${uid}`);
      return;
    }
    const userQuiz = await getQuizWithSpecifiedRequirements(userObj.gameStatus);
    res.json(userQuiz);
  });

export const onLikeChange = functions
  .region(REGION)
  .firestore.document('users/{userId}')
  .onUpdate(change => {
    const after = change.after.data() as UserStatus;
    const before = change.before.data() as UserStatus;

    const likesAfter = after.likedPurposes;
    const likesBefore = before.likedPurposes;

    likesBefore
      .filter(likeBefore => !likesAfter.includes(likeBefore))
      .forEach(dislikePost);
    likesAfter
      .filter(likeAfter => !likesBefore.includes(likeAfter))
      .forEach(likePost);
  });

export const onAddComment = functions
  .region(REGION)
  .firestore.document('quizzes/{purposeID}/comments/{commentId}')
  .onCreate((_, context) => {
    const purposeID = context.params['purposeID'] as string;
    incrementPostCount(purposeID);
  });

export const onRemoveComment = functions
  .region(REGION)
  .firestore.document('quizzes/{purposeID}/comments/{commentId}')
  .onDelete((_, context) => {
    const purposeID = context.params['purposeID'] as string;
    decrementPostCount(purposeID);
  });
