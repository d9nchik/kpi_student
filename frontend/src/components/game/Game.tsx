import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  getGameObj,
  subscribe,
  unsubscribe,
  setGameObj as setGameStatus,
  GameStatus,
} from '../../data/dataStorage';
import { calculateLevel } from '../../data/tools';

import RegisterGame from './RegisterGame';
import GameHeader from './GameHeader';
import GameBody from './GameBody';
import GameQuiz from './GameQuiz';
import Loading from '../Loading';

const Game: FunctionComponent = () => {
  const [gameObj, setGameObj] = useState<GameStatus | null | undefined>();
  useEffect(() => {
    if (!gameObj) {
      updateGameObj();
    }
    subscribe(updateGameObj);
    return unsubscribe;

    async function updateGameObj() {
      setGameObj(await getGameObj());
    }
  });

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!gameObj) {
        return;
      }

      gameObj.gameLevel += 100;
      setGameStatus(gameObj);
    }, 1000 * 300);
    return () => clearInterval(intervalID);
  });

  if (gameObj === undefined) {
    return <Loading />;
  }

  if (!gameObj) {
    return <RegisterGame />;
  }

  const { currentXP, XPNeeded } = calculateLevel(gameObj.gameLevel);

  return (
    <div>
      <GameHeader {...gameObj} />
      {currentXP / XPNeeded < 0.1 ? (
        <GameQuiz gameStatus={gameObj} />
      ) : (
        <GameBody gameStatus={gameObj} />
      )}
    </div>
  );
};

export default Game;
