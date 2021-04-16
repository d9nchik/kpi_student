import * as functions from 'firebase-functions';
import {
  dislikePost,
  getQuizWithSpecifiedRequirements,
  getUserObj,
  likePost,
  UserStatus,
} from './tools';

export const getRandomQuiz = functions
  .region('europe-west3')
  .https.onRequest(async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    try {
      functions.logger.log(`rawBody = ${String(req.rawBody)}`);

      const uid = req.body.data.uid as string;
      const userObj = await getUserObj(uid);
      if (!userObj || !userObj.gameStatus) {
        res.sendStatus(404);
        functions.logger.warn(`Invalid uid: ${uid}`);
        return;
      }
      const userQuiz = await getQuizWithSpecifiedRequirements(
        userObj.gameStatus
      );
      res.json(userQuiz);
    } catch (error) {
      functions.logger.error(error);
      res.sendStatus(200);
    }
  });

export const onLikeChange = functions
  .region('europe-west3')
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

// TODO: write add comment
