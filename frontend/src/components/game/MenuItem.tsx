import React, { FunctionComponent } from 'react';
import { MenuItem as Item } from '../../utilities/tools';
import { applyMenuCharacteristic } from '../../utilities/tools';

import Money from './images/money.png';
import HealthCare from './images/health-care.png';
import FastFood from './images/fast-food.png';
import Thought from './images/thought.png';
import Shelving from './images/shelving.png';
import Household from './images/household.png';

const MenuItem: FunctionComponent<Item> = ({ name, characteristics }: Item) => {
  const {
    heartsPoint,
    satietyLevel,
    money,
    educationLevel,
    careLevel,
    mentalStrength,
  } = characteristics;
  return (
    <div onClick={() => applyMenuCharacteristic(characteristics)}>
      <h3>{name}</h3>
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
  );
};

export default MenuItem;
