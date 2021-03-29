import React, { FunctionComponent, useState } from 'react';
import {
  AnswerVariant as Answer,
  Characteristic,
} from '../../utilities/dataStorage';

import AddCharacteristic from './AddCharacteristics';

interface IProps extends Answer {
  setAnswer: (answer: Answer) => void;
}

const AnswerVariant: FunctionComponent<IProps> = ({
  setAnswer,
  name,
  loseCharacteristics,
  successCharacteristics,
  successProbability,
  requirements,
}: IProps) => {
  const [privateName, setPrivateName] = useState(name);
  const [privateSuccessProbability, setPrivateSuccessProbability] = useState(
    successProbability
  );

  const sendCharacteristic = (
    characteristic: Characteristic,
    key: 'loseCharacteristics' | 'successCharacteristics' | 'requirements'
  ) => {
    const answer: Answer = {
      name: privateName,
      loseCharacteristics,
      successCharacteristics,
      successProbability: privateSuccessProbability,
      requirements,
    };
    answer[key] = characteristic;
    setAnswer(answer);
  };
  return (
    <div>
      <label>
        Answer name
        <input
          type="text"
          value={privateName}
          onChange={e => {
            const newName = e.target.value;
            setAnswer({
              name: newName,
              loseCharacteristics,
              successProbability,
              requirements,
              successCharacteristics,
            });
            setPrivateName(newName);
          }}
        />
      </label>
      <label>
        Probability of success
        <input
          type="number"
          value={privateSuccessProbability}
          onChange={e => {
            const newSuccessProbability = Number(e.target.value);
            setAnswer({
              name,
              loseCharacteristics,
              successProbability: newSuccessProbability,
              requirements,
              successCharacteristics,
            });
            setPrivateSuccessProbability(newSuccessProbability);
          }}
        />
      </label>
      Requirements
      <AddCharacteristic
        {...requirements}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'requirements')
        }
      />
      Success Characteristic
      <AddCharacteristic
        {...requirements}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'successCharacteristics')
        }
      />
      Lose Characteristic
      <AddCharacteristic
        {...requirements}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'loseCharacteristics')
        }
      />
    </div>
  );
};
export default AnswerVariant;
