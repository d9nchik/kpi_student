import React, { FunctionComponent } from 'react';

import { GameStatus } from '../../utilities/dataStorage';
import { calculateLevel } from '../../utilities/tools';

const GameHeader: FunctionComponent<GameStatus> = ({
  satietyLevel,
  heartsPoint,
  careLevel,
  characterName,
  mentalStrength,
  money,
  gameLevel,
  educationLevel,
}: GameStatus) => {
  const { XPNeeded, currentXP, level } = calculateLevel(gameLevel);
  return (
    <header>
      <p>
        Hearts Point
        <progress max={100 * level} value={heartsPoint} />
        Satiety Level
        <progress max={100 * level} value={satietyLevel} />
        Mental Strength
        <progress max={100 * level} value={mentalStrength} />
      </p>
      <p>
        Money <span>{money}₴</span>
        Education Level <span>{Math.floor(educationLevel / level)}%</span>
        Care Level<span>{Math.floor(careLevel / level)}%</span>
      </p>
      *{level} <progress max={XPNeeded} value={currentXP} />
    </header>
  );
};

export default GameHeader;
