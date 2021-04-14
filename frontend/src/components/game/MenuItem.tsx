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
      id={'taskN'}
      onClick={() => applyMenuCharacteristic(characteristics, gameObj)}
    >
      <h3>{name}</h3>
      <div>
        {heartsPoint && (
          <span>
            <img
              src={HealthCare}
              alt="health care"
              style={{ background: 'brown', width: '25px' }}
            />
            {heartsPoint}
          </span>
        )}
        {satietyLevel && (
          <span>
            <img
              src={FastFood}
              alt="fast food"
              style={{ background: 'brown', width: '25px' }}
            />
            {satietyLevel}
          </span>
        )}
        {money && (
          <span>
            <img
              src={Money}
              alt="money"
              style={{ background: 'brown', width: '25px' }}
            />
            {money}₴
          </span>
        )}
        {educationLevel && (
          <span>
            <img
              src={Shelving}
              alt="shelving"
              style={{ background: 'brown', width: '25px' }}
            />
            {educationLevel}
          </span>
        )}
        {careLevel && (
          <span>
            <img
              src={Household}
              alt="household"
              style={{ background: 'brown', width: '25px' }}
            />
            {careLevel}
          </span>
        )}
        {mentalStrength && (
          <span>
            <img
              src={Thought}
              alt="thought"
              style={{ background: 'brown', width: '25px' }}
            />
            {mentalStrength}
          </span>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
