import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  getGameObj,
  newGame,
  subscribe,
  unsubscribe,
} from '../../utilities/dataStorage';
import { calculateLevel } from '../../utilities/tools';

import RegisterGame from './RegisterGame';
import GameHeader from './GameHeader';
import GameBody from './GameBody';
import GameQuiz from './GameQuiz';

const Game: FunctionComponent = () => {
  const [gameObj, setGameObj] = useState(getGameObj());
  useEffect(() => {
    subscribe(() => setGameObj(getGameObj()));
    return unsubscribe;
  });

  if (!gameObj) {
    return (
      <RegisterGame
        makeNewGame={characterName => {
          newGame(characterName);
          setGameObj(getGameObj);
        }}
      />
    );
  }

  const { currentXP, XPNeeded } = calculateLevel(gameObj.gameLevel);

  return (
    <div>
      <GameHeader {...gameObj} />
      {currentXP / XPNeeded < 0.1 ? (
        <GameQuiz gameStatus={gameObj} />
      ) : (
        <GameBody characterName={gameObj.characterName} />
      )}
    </div>
  );
};

export default Game;
