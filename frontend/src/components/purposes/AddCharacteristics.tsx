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
  const characteristic: Characteristic = {
    heartsPoint,
    satietyLevel,
    mentalStrength,
    money,
    educationLevel,
    careLevel,
  };
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
  return (
    <div>
      <ChangeRange
        {...heartsPoint}
        name="Hearts Point"
        setRange={range => {
          sendCharacteristicUp('heartsPoint', range);
          console.log(range);
        }}
      />
      <ChangeRange
        {...satietyLevel}
        name="Satiety Level"
        setRange={range => sendCharacteristicUp('satietyLevel', range)}
      />
      <ChangeRange
        name="Mental Strength"
        {...mentalStrength}
        setRange={range => sendCharacteristicUp('mentalStrength', range)}
      />
      <ChangeRange
        name="Money"
        {...money}
        setRange={range => sendCharacteristicUp('money', range)}
      />
      <ChangeRange
        name="Education Level"
        {...educationLevel}
        setRange={range => sendCharacteristicUp('educationLevel', range)}
      />
      <ChangeRange
        name="Care Level"
        {...careLevel}
        setRange={range => sendCharacteristicUp('careLevel', range)}
      />
    </div>
  );
};

export default AddCharacteristic;
