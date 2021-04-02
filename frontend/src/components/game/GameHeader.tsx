import React, { FunctionComponent } from 'react';
import { GameStatus } from '../../utilities/dataStorage';
import { calculateLevel } from '../../utilities/tools';

import Money from './money.png';
import HealthCare from './health-care.png';
import FastFood from './fast-food.png';
import Thought from './thought.png';
import Shelving from './shelving.png';
import Household from './household.png';

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
        <img
          src={HealthCare}
          alt="health care"
          style={{ background: 'brown', width: '25px' }}
        />
        <progress max={100 * level} value={heartsPoint} />
        <img
          src={FastFood}
          alt="fast food"
          style={{ background: 'brown', width: '25px' }}
        />
        <progress max={100 * level} value={satietyLevel} />
        <img
          src={Thought}
          alt="thought"
          style={{ background: 'brown', width: '25px' }}
        />
        <progress max={100 * level} value={mentalStrength} />
      </p>
      <p>
        <img
          src={Money}
          alt="money"
          style={{ background: 'brown', width: '25px' }}
        />
        <span>{money}₴</span>
        <img
          src={Shelving}
          alt="shelving"
          style={{ background: 'brown', width: '25px' }}
        />
        <span>{Math.floor(educationLevel / level)}%</span>
        <img
          src={Household}
          alt="household"
          style={{ background: 'brown', width: '25px' }}
        />
        <span>{Math.floor(careLevel / level)}%</span>
      </p>
      *{level} <progress max={XPNeeded} value={currentXP} />
    </header>
  );
};

export default GameHeader;
