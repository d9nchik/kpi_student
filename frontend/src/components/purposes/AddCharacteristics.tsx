import React, { FunctionComponent } from 'react';
import { Characteristic, Range } from '../../utilities/dataStorage';
import { characteristicKeys } from '../../utilities/tools';

import ChangeRange from './ChangeRange';

interface IProps {
  characteristic: Characteristic;
  setCharacteristic: (characteristic: Characteristic) => void;
}

const AddCharacteristic: FunctionComponent<IProps> = ({
  characteristic,
  setCharacteristic,
}: IProps) => {
  const sendCharacteristicUp = (
    nameOfField:
      | 'heartsPoint'
      | 'satietyLevel'
      | 'mentalStrength'
      | 'money'
      | 'educationLevel'
      | 'careLevel',
    range: Range
  ) => {
    characteristic[nameOfField] = range;
    setCharacteristic(characteristic);
  };

  const nameDict = {
    heartsPoint: 'Hearts Point',
    satietyLevel: 'Satiety Level',
    mentalStrength: 'Mental Strength',
    money: 'Money',
    educationLevel: 'Education Level',
    careLevel: 'Care Level',
  };

  return (
    <div>
      {characteristicKeys.map(key => (
        <ChangeRange
          {...characteristic[key]}
          name={nameDict[key]}
          setRange={range => {
            sendCharacteristicUp(key, range);
          }}
          key={key}
        />
      ))}
    </div>
  );
};

export default AddCharacteristic;
