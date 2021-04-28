import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { GameStatus } from '../../../data/dataStorage';
import GameQuiz from '../GameQuiz';

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

test('characteristics should be passed to tools.ts', async () => {
  act(() => {
    render(<GameQuiz gameStatus={gameStatus} />);
  });
  expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
    'Summary week'
  );
  expect(screen.getByText('Learn everything')).toBeInTheDocument();
  expect(screen.getByText('Learn half')).toBeInTheDocument();
});
