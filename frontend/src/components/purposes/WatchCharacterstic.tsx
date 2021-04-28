import React, { FunctionComponent } from 'react';
import { Range } from '../../data/dataStorage';

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

export default WatchCharacteristic;
