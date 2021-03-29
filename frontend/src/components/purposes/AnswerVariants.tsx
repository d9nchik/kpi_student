import React, { FunctionComponent, useState } from 'react';
import { AnswerVariant as AnswerVariantInterface } from '../../utilities/dataStorage';

import AnswerVariant from './AnswerVariant';

interface IProps {
  setAnswers: (answers: AnswerVariantInterface[]) => void;
}

const AnswerVariants: FunctionComponent<IProps> = ({ setAnswers }: IProps) => {
  const [answers, setCustomAnswers] = useState<AnswerVariantInterface[]>([]);
  const setAnsw = (answers: AnswerVariantInterface[]) => {
    setAnswers(answers);
    setCustomAnswers(answers);
  };
  return (
    <div>
      {answers.map((answer, index) => (
        <AnswerVariant
          {...answer}
          key={answer.name + index + answer.successProbability}
          setAnswer={answer => {
            answers[index] = answer;
            setAnsw(answers);
          }}
        />
      ))}
      <button
        onClick={e => {
          e.preventDefault();
          setAnsw([
            ...answers,
            {
              name: '',
              successProbability: 0,
              requirements: {},
              loseCharacteristics: {},
              successCharacteristics: {},
            },
          ]);
        }}
      >
        Add answer variant
      </button>
    </div>
  );
};

export default AnswerVariants;
