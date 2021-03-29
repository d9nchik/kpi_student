import React, { FunctionComponent } from 'react';
import { Range } from '../../utilities/dataStorage';

interface IProps extends Range {
  setRange: (range: Range) => void;
}

const ChangeRange: FunctionComponent<IProps> = ({
  minValue,
  maxValue,
  setRange,
}: IProps) => {
  return (
    <div>
      <label>
        Minimal Value
        <input
          type="number"
          value={minValue}
          onChange={e => {
            const newMinValue = Number(e.target.value);
            if (Number.isNaN(newMinValue)) {
              return;
            }
            setRange({ minValue: newMinValue, maxValue });
          }}
        />
      </label>
      <label>
        Maximal Value
        <input
          type="number"
          value={maxValue}
          onChange={e => {
            const newMaxValue = Number(e.target.value);
            if (Number.isNaN(newMaxValue)) {
              return;
            }
            setRange({ minValue, maxValue: newMaxValue });
          }}
        />
      </label>
    </div>
  );
};

export default ChangeRange;
