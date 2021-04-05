import React, { FunctionComponent } from 'react';
import { GameStatus } from '../../utilities/dataStorage';
import { getQuizWithSpecifiedRequirements } from '../../utilities/tools';

import QuizVariantItem from './QuizVariantItem';

import Muha from './images/muha.jpg';

interface IProps {
  gameStatus: GameStatus;
}

const GameQuiz: FunctionComponent<IProps> = ({ gameStatus }: IProps) => {
  const { quizName, answerVariants } = getQuizWithSpecifiedRequirements(
    gameStatus
  );
  return (
    <div>
      <h2>{quizName}</h2>
      <img src={Muha} alt="quiz" />
      <div>
        {answerVariants.map(answerVariant => (
          <QuizVariantItem
            answerVariant={answerVariant}
            gameStatus={gameStatus}
            key={answerVariant.name}
          />
        ))}
      </div>
    </div>
  );
};

export default GameQuiz;
