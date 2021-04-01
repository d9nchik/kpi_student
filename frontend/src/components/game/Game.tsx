import React, { FunctionComponent, useState } from 'react';
import { getGameObj, newGame } from '../../utilities/dataStorage';

import RegisterGame from './RegisterGame';

const Game: FunctionComponent = () => {
  const [gameObj, setGameObj] = useState(getGameObj());
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
  return <div>Hi, {gameObj.characterName}</div>;
};

export default Game;
