import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnswerVariant, GameStatus } from '../../../data/dataStorage';
import { applyQuizVariantItem } from '../../../data/tools';
import QuizVariantItem from '../QuizVariantItem';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');

const gameStatus: GameStatus = {
  gameLevel: 10,
  characterName: 'Ivan',
  heartsPoint: 50,
  satietyLevel: 30,
  isDead: false,
  money: 20_000,
  mentalStrength: 80,
  educationLevel: 23,
  careLevel: 42,
};

const answerVariant: AnswerVariant = {
  name: 'Buy Milk',
  successProbability: 1,
  successCharacteristics: {
    money: { minValue: -100, maxValue: -100 },
    heartsPoint: { minValue: 200, maxValue: 200 },
  },
  loseCharacteristics: {
    money: { minValue: -100 },
    heartsPoint: { maxValue: -300 },
  },
  requirements: { heartsPoint: { minValue: 300 } },
};

beforeEach(() =>
  render(
    <QuizVariantItem gameStatus={gameStatus} answerVariant={answerVariant} />
  )
);

test('characteristics should be passed to tools.ts', async () => {
  fireEvent.click(screen.getByText('Buy Milk'));
  expect(applyQuizVariantItem).toHaveBeenCalledWith(
    answerVariant.successProbability,
    answerVariant.successCharacteristics,
    answerVariant.loseCharacteristics,
    gameStatus
  );
});
