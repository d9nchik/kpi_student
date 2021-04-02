import React, { FunctionComponent, useState } from 'react';
import { Range } from '../../utilities/dataStorage';

interface IProps extends Range {
  setRange: (range: Range) => void;
  name: string;
}

const ChangeRange: FunctionComponent<IProps> = ({
  minValue,
  maxValue,
  setRange,
  name,
}: IProps) => {
  const [isVisible, setVisible] = useState(!!minValue || !!maxValue);
  if (!isVisible) {
    return (
      <button
        onClick={e => {
          e.preventDefault();
          setVisible(true);
        }}
      >
        {`Add '${name}'`}
      </button>
    );
  }

  return (
    <div>
      <h5>{name}</h5>
      <label>
        Minimal Value
        <input
          type="number"
          value={minValue}
          onChange={e => {
            const value = e.target.value;
            if (!value) {
              setRange({ maxValue });
              return;
            }
            const newMinValue = Number(value);
            if (Number.isNaN(newMinValue)) {
              return;
            }

            minValue = newMinValue;
            checkAndSetRange();
          }}
        />
      </label>
      <label>
        Maximal Value
        <input
          type="number"
          value={maxValue}
          onChange={e => {
            const value = e.target.value;
            if (!value) {
              setRange({ minValue });
              return;
            }
            const newMaxValue = Number(value);
            if (Number.isNaN(newMaxValue)) {
              return;
            }
            maxValue = newMaxValue;
            checkAndSetRange();
          }}
        />
      </label>
      <button
        onClick={e => {
          e.preventDefault();
          setVisible(false);
          setRange({});
        }}
      >{`Remove '${name}'`}</button>
    </div>
  );

  function checkAndSetRange() {
    if (
      maxValue === undefined ||
      minValue === undefined ||
      minValue < maxValue
    ) {
      setRange({ minValue, maxValue });
    }
  }
};

export default ChangeRange;
