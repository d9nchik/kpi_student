import React, { FunctionComponent } from 'react';
import { AnswerVariant, GameStatus } from '../../utilities/dataStorage';
import { applyQuizVariantItem } from '../../utilities/tools';

interface IProps {
  answerVariant: AnswerVariant;
  gameStatus: GameStatus;
}

const QuizVariantItem: FunctionComponent<IProps> = ({
  answerVariant: {
    name,
    successCharacteristics,
    successProbability,
    loseCharacteristics,
  },
  gameStatus,
}: IProps) => {
  return (
    <button
      onClick={() =>
        applyQuizVariantItem(
          successProbability,
          successCharacteristics,
          loseCharacteristics,
          gameStatus
        )
      }
    >
      {name}
    </button>
  );
};

export default QuizVariantItem;
