import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameStatus } from '../../../data/dataStorage';
import GameBody from '../GameBody';

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

beforeEach(() => render(<GameBody gameStatus={gameStatus} />));

test('GameBody should contain characterName and daysInUniversity', () => {
  expect(screen.getByText('Ivan')).toBeInTheDocument();
  expect(screen.getByText('2 days')).toBeInTheDocument();
});

test('GameBody should give ability to open menus', () => {
  fireEvent.click(screen.getByText('Общага'));
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Общага');
  fireEvent.click(screen.getByText('Работа'));
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Работа');
  fireEvent.click(screen.getByText('Универ'));
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Универ');
  fireEvent.click(screen.getByAltText('Библиотека'));
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Библиотека'
  );
  fireEvent.click(screen.getByAltText('Магазин'));
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Магазин'
  );

  fireEvent.click(screen.getByText('Отдых'));
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Отдых');
  expect(heading).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('Close'));
  expect(heading).not.toBeInTheDocument();
});
