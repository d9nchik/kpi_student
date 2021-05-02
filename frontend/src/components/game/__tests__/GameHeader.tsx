import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameStatus } from '../../../data/dataStorage';
import GameHeader from '../GameHeader';
import { isAuthenticated, loginWithGithub } from '../../../data/auth';

jest.mock('../../../data/dataStorage.ts');
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

beforeEach(() => render(<GameHeader {...gameStatus} />));

test('game status contains all characteristics', async () => {
  expect(screen.getByText(`${gameStatus.money}₴`)).toBeInTheDocument();
  expect(screen.getByText(`${gameStatus.careLevel}%`)).toBeInTheDocument();
  expect(screen.getByText(`${gameStatus.educationLevel}%`)).toBeInTheDocument();
});

test('when user click on avatar he/she can logout', async () => {
  await loginWithGithub();
  expect(isAuthenticated()).toBeTruthy();
  fireEvent.click(screen.getByAltText('avatar'));
  expect(isAuthenticated()).toBeFalsy();
});
