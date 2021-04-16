import * as functions from 'firebase-functions';
import { getQuizWithSpecifiedRequirements, getUserObj } from './tools';

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
