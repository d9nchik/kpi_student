import React, { FunctionComponent, useState } from 'react';
import {
  AnswerVariant as Answer,
  Characteristic,
} from '../../data/dataStorage';

import AddCharacteristic from './AddCharacteristics';
import './AnswerVariant.css';
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

  const answer: Answer = {
    name: privateName,
    loseCharacteristics,
    successCharacteristics,
    successProbability: privateSuccessProbability,
    requirements,
  };

  const sendCharacteristic = (
    characteristic: Characteristic,
    key: 'loseCharacteristics' | 'successCharacteristics' | 'requirements'
  ) => {
    answer.name = privateName;
    answer.successProbability = privateSuccessProbability;
    answer[key] = characteristic;
    setAnswer(answer);
  };
  return (
    <div id={'ansDiv'}>
      <h3>Variant</h3>
      <label>
        Answer name
        <input
          id={'inputInfo'}
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
          required
        />
      </label>
      <label>
        Probability of success
        <input
          id={'inputInfo'}
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
          required
        />
      </label>
      <h4>Requirements</h4>
      <AddCharacteristic
        characteristic={{ ...requirements }}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'requirements')
        }
      />
      <h4>Success Characteristic</h4>
      <AddCharacteristic
        characteristic={{ ...successCharacteristics }}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'successCharacteristics')
        }
      />
      <h4>Lose Characteristic</h4>
      <AddCharacteristic
        characteristic={{ ...loseCharacteristics }}
        setCharacteristic={characteristic =>
          sendCharacteristic(characteristic, 'loseCharacteristics')
        }
      />
    </div>
  );
};
export default AnswerVariant;
