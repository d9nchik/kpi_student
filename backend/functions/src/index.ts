import * as functions from 'firebase-functions';
import { GameStatus, getQuizWithSpecifiedRequirements } from './tools';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
  .region('europe-west3')
  .https.onRequest((_, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from here!');
  });

export const getRandomQuiz = functions
  .region('europe-west3')
  .https.onRequest(async (req, res) => {
    const gameStatus = req.body as GameStatus;
    const userQuiz = await getQuizWithSpecifiedRequirements(gameStatus);
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.json(userQuiz);
  });
