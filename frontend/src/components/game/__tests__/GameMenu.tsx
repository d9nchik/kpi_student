import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameStatus } from '../../../data/dataStorage';
import GameMenu from '../GameMenu';

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

const closeMenu = jest.fn();

beforeEach(() =>
  render(
    <GameMenu gameStatus={gameStatus} closeMenu={closeMenu} menuName="relax" />
  )
);

test('when user click on exit image component execute closeMenu function', () => {
  expect(closeMenu).toBeCalledTimes(0);
  fireEvent.click(screen.getByAltText('Close'));
  expect(closeMenu).toBeCalledTimes(1);
});

test('GameMenu should render all MenuItems', () => {
  expect(screen.getByText('Play UNO')).toBeInTheDocument();
  expect(screen.getByText('dance Hip-Hop')).toBeInTheDocument();
});
