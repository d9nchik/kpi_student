import React, { FunctionComponent } from 'react';
import { Characteristic, Range } from '../../utilities/dataStorage';

import ChangeRange from './ChangeRange';

interface IProps extends Characteristic {
  setCharacteristic: (characteristic: Characteristic) => void;
}

const AddCharacteristic: FunctionComponent<IProps> = ({
  heartsPoint,
  satietyLevel,
  mentalStrength,
  money,
  educationLevel,
  careLevel,
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
    const characteristic: Characteristic = {
      heartsPoint,
      satietyLevel,
      mentalStrength,
      money,
      educationLevel,
      careLevel,
    };
    characteristic[nameOfField] = range;
    setCharacteristic(characteristic);
  };
  return (
    <div>
      Hearts Point
      <ChangeRange
        {...heartsPoint}
        setRange={range => sendCharacteristicUp('heartsPoint', range)}
      />
      Satiety Level
      <ChangeRange
        {...satietyLevel}
        setRange={range => sendCharacteristicUp('satietyLevel', range)}
      />
      Mental Strength
      <ChangeRange
        {...mentalStrength}
        setRange={range => sendCharacteristicUp('mentalStrength', range)}
      />
      Money
      <ChangeRange
        {...money}
        setRange={range => sendCharacteristicUp('money', range)}
      />
      Education Level
      <ChangeRange
        {...educationLevel}
        setRange={range => sendCharacteristicUp('educationLevel', range)}
      />
      Care Level
      <ChangeRange
        {...careLevel}
        setRange={range => sendCharacteristicUp('careLevel', range)}
      />
    </div>
  );
};

export default AddCharacteristic;
