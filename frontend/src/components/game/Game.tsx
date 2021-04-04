import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  getGameObj,
  newGame,
  subscribe,
  unsubscribe,
} from '../../utilities/dataStorage';

import RegisterGame from './RegisterGame';
import GameHeader from './GameHeader';
import GameBody from './GameBody';

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

  return (
    <div>
      <GameHeader {...gameObj} />
      <GameBody characterName={gameObj.characterName} />
    </div>
  );
};

export default Game;
