import React, { FunctionComponent } from 'react';
import { MenuItem as Item } from '../../utilities/tools';
import { applyMenuCharacteristic } from '../../utilities/tools';

import Money from './images/money.png';
import HealthCare from './images/health-care.png';
import FastFood from './images/fast-food.png';
import Thought from './images/thought.png';
import Shelving from './images/shelving.png';
import Household from './images/household.png';
import { GameStatus } from '../../utilities/dataStorage';

import './MenuItem.css';

interface IProps {
  item: Item;
  gameObj: GameStatus;
}

const MenuItem: FunctionComponent<IProps> = ({
  item: { name, characteristics },
  gameObj,
}: IProps) => {
  const {
    heartsPoint,
    satietyLevel,
    money,
    educationLevel,
    careLevel,
    mentalStrength,
  } = characteristics;
  return (
    <div
      className="menuItem"
      onClick={() => applyMenuCharacteristic(characteristics, gameObj)}
    >
      <h3>{name}</h3>
      <div id={'charBlock'}>
        {heartsPoint && (
          <span>
            <img
              src={HealthCare}
              alt="health care"
              style={{ background: '#e71d36' }}
            />
            {heartsPoint}
          </span>
        )}
        {satietyLevel && (
          <span>
            <img
              src={FastFood}
              alt="fast food"
              style={{ background: '#ff9f1c' }}
            />
            {satietyLevel}
          </span>
        )}
        {money && (
          <span>
            <img src={Money} alt="money" style={{ background: '#55a630' }} />
            {money}₴
          </span>
        )}
        {educationLevel && (
          <span>
            <img
              src={Shelving}
              alt="shelving"
              style={{ background: '#55a630' }}
            />
            {educationLevel}
          </span>
        )}
        {careLevel && (
          <span>
            <img
              src={Household}
              alt="household"
              style={{ background: '#55a630' }}
            />
            {careLevel}
          </span>
        )}
        {mentalStrength && (
          <span>
            <img
              src={Thought}
              alt="thought"
              style={{ background: '#007f5f' }}
            />
            {mentalStrength}
          </span>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
