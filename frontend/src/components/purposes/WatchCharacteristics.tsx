import React, { FunctionComponent } from 'react';
import { Characteristic } from '../../data/dataStorage';
import WatchCharacteristic from './WatchCharacterstic';

const WatchCharacteristics: FunctionComponent<Characteristic> = ({
  heartsPoint,
  satietyLevel,
  mentalStrength,
  money,
  educationLevel,
  careLevel,
}: Characteristic) => {
  return (
    <ul>
      <WatchCharacteristic {...heartsPoint} name="Hearts Point" />
      <WatchCharacteristic {...satietyLevel} name="Satiety Level" />
      <WatchCharacteristic {...mentalStrength} name="Mental Strength" />
      <WatchCharacteristic {...money} name="Money, $" />
      <WatchCharacteristic {...educationLevel} name="Education Level" />
      <WatchCharacteristic {...careLevel} name="Care Level" />
    </ul>
  );
};

export default WatchCharacteristics;
