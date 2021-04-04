import React, { FunctionComponent } from 'react';
import { GameStatus } from '../../utilities/dataStorage';
import { calculateLevel } from '../../utilities/tools';
import { Link } from 'react-router-dom';

import Money from './images/money.png';
import HealthCare from './images/health-care.png';
import FastFood from './images/fast-food.png';
import Thought from './images/thought.png';
import Shelving from './images/shelving.png';
import Household from './images/household.png';
import Avatar from './images/avatar.jpg';
import './GameHeader.css';
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
      <div className="grid">
        <div className="span-row-2">
          <Link to="/logout">
            <img id={'avatar'} src={Avatar} alt="avatar" />
          </Link>
        </div>
        <div>
          <img
            src={HealthCare}
            alt="health care"
            style={{ background: 'brown', width: '25px' }}
          />
          <progress max={100 * level} value={heartsPoint} />
        </div>
        <div>
          <img
            src={FastFood}
            alt="fast food"
            style={{ background: 'brown', width: '25px' }}
          />
          <progress max={100 * level} value={satietyLevel} />
        </div>
        <div>
          <img
            src={Thought}
            alt="thought"
            style={{ background: 'brown', width: '25px' }}
          />
          <progress max={100 * level} value={mentalStrength} />
        </div>
        <div>
          <img
            src={Money}
            alt="money"
            style={{ background: 'brown', width: '25px' }}
          />
          <span>{money}₴</span>
        </div>
        <div>
          <img
            src={Shelving}
            alt="shelving"
            style={{ background: 'brown', width: '25px' }}
          />
          <span>{Math.floor(educationLevel / level)}%</span>
        </div>
        <div>
          <img
            src={Household}
            alt="household"
            style={{ background: 'brown', width: '25px' }}
          />
          <span>{Math.floor(careLevel / level)}%</span>
        </div>
        <div className="span-col-4">
          *{level} <progress max={XPNeeded} value={currentXP} />
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
