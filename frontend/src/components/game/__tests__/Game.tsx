import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { setGameObj, GameStatus } from '../../../data/dataStorage';
import Game from '../Game';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');
jest.mock('../../../data/auth.ts');

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

test('if user have live character Game should render GameHeader', async () => {
  await act(async () => {
    render(<Game />);
  });
  expect(screen.getByAltText('avatar')).toBeInTheDocument();
});

test('if user has small XP, they should see quiz', async () => {
  await act(async () => {
    render(<Game />);
  });
  expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
    'Summary week'
  );
});

test('if user not have small XP, they should see GameBody component', async () => {
  setGameObj({ ...gameStatus, gameLevel: 45 });

  await act(async () => {
    render(<Game />);
  });

  expect(screen.getByText('Ivan')).toBeInTheDocument();
});

test('if user not have active Game, they should see RegisterGame component', async () => {
  setGameObj({ ...gameStatus, isDead: true });

  await act(async () => {
    render(<Game />);
  });

  expect(screen.getByLabelText(/Name of Character/i)).toBeInTheDocument();
});
