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
      title={`Probability of success: ${successProbability}
      Success characteristics: ${JSON.stringify(
        successCharacteristics,
        null,
        2
      )}
      Lose characteristics: ${JSON.stringify(loseCharacteristics, null, 2)}`}
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
