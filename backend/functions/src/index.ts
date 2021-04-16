import * as functions from 'firebase-functions';
import { GameStatus, getQuizWithSpecifiedRequirements } from './tools';

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
