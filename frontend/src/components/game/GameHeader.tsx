import React, { FunctionComponent } from 'react';
import { GameStatus, getUserAvatar } from '../../utilities/dataStorage';
import { calculateLevel } from '../../utilities/tools';
import { logout } from '../../utilities/auth';
import { useHistory } from 'react-router-dom';

import Money from './images/money.png';
import HealthCare from './images/health-care.png';
import FastFood from './images/fast-food.png';
import Thought from './images/thought.png';
import Shelving from './images/shelving.png';
import Household from './images/household.png';
import Avatar from './images/avatar.jpg';
import Star from './images/star.png';

import './GameHeader.css';

const GameHeader: FunctionComponent<GameStatus> = ({
  satietyLevel,
  heartsPoint,
  careLevel,
  mentalStrength,
  money,
  gameLevel,
  educationLevel,
}: GameStatus) => {
  const { XPNeeded, currentXP, level } = calculateLevel(gameLevel);
  const history = useHistory();

  return (
    <header>
      <div className="grid">
        <div className="span-row-2">
          <img
            id="avatar"
            src={getUserAvatar() || Avatar}
            alt="avatar"
            onClick={async () => {
              await logout();
              history.push('/login');
            }}
          />
        </div>
        <div>
          <img
            src={HealthCare}
            alt="health care"
            style={{ background: '#e71d36' }}
          />
          <progress max={100 * level} value={heartsPoint} />
        </div>
        <div>
          <img
            src={FastFood}
            alt="fast food"
            style={{ background: '#ff9f1c' }}
          />
          <progress max={100 * level} value={satietyLevel} />
        </div>
        <div>
          <img src={Thought} alt="thought" style={{ background: '#007f5f' }} />
          <progress max={100 * level} value={mentalStrength} />
        </div>
        <div className="head-text-card">
          <img src={Money} alt="money" style={{ background: '#55a630' }} />
          <span>{money}₴</span>
        </div>
        <div className="head-text-card">
          <img
            src={Shelving}
            alt="shelving"
            style={{ background: '#55a630' }}
          />
          <span>{Math.floor(educationLevel / level)}%</span>
        </div>
        <div className="head-text-card">
          <img
            src={Household}
            alt="household"
            style={{ background: '#55a630' }}
          />
          <span>{Math.floor(careLevel / level)}%</span>
        </div>
        <div className="span-col-4 level">
          <div id="level-icon">
            <img src={Star} alt="star" />
            {level}
          </div>
          <progress max={XPNeeded} value={currentXP} />
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
