import React, { FunctionComponent } from 'react';
import { Characteristic, Range } from '../../data/dataStorage';
interface IProps extends Range {
  name: string;
}

const WatchCharacteristic: FunctionComponent<IProps> = ({
  minValue,
  maxValue,
  name,
}: IProps) => {
  if (minValue && maxValue) {
    return <li>{`${name} -> ${minValue} <-> ${maxValue}`}</li>;
  }
  if (minValue) {
    return <li>{`${name} > ${minValue}`}</li>;
  }
  if (maxValue) {
    return <li>{`${name} < ${maxValue}`}</li>;
  }
  return <div />;
};

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
