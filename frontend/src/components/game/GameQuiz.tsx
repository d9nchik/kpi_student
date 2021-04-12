import React, { FunctionComponent, useState, useEffect } from 'react';
import { GameStatus, QuizWithOnlyBody } from '../../utilities/dataStorage';
import { getQuizWithSpecifiedRequirements } from '../../utilities/tools';

import QuizVariantItem from './QuizVariantItem';
import Loading from '../Loading';

import Muha from './images/muha.jpg';

interface IProps {
  gameStatus: GameStatus;
}

const GameQuiz: FunctionComponent<IProps> = ({ gameStatus }: IProps) => {
  const [quiz, setQuiz] = useState<QuizWithOnlyBody | null>(null);

  useEffect(() => {
    if (!quiz) {
      (async () =>
        setQuiz(await getQuizWithSpecifiedRequirements(gameStatus)))();
    }
  });

  if (!quiz) {
    return <Loading />;
  }

  const { quizName, answerVariants, imageURL } = quiz;
  return (
    <div>
      <h2>{quizName}</h2>
      <img src={imageURL || Muha} alt="quiz" />
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
