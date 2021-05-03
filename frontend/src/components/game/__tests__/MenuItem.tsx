import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameStatus } from '../../../data/dataStorage';
import { MenuItem as Item, applyMenuCharacteristic } from '../../../data/tools';
import MenuItem from '../MenuItem';

jest.mock('../../../data/tools.ts');
jest.mock('../../../data/dataStorage.ts');

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

const menuItem: Item = {
  name: 'Learn Haskell',
  characteristics: {
    educationLevel: 100,
    money: -500,
  },
};

beforeEach(() => render(<MenuItem gameObj={gameStatus} item={menuItem} />));

test('when user click on menuItem it should pass correct parameters to applyMenuCharacteristics', () => {
  fireEvent.click(screen.getByRole('heading', { level: 3 }));
  expect(applyMenuCharacteristic).toBeCalledTimes(1);
  expect(applyMenuCharacteristic).toBeCalledWith(
    menuItem.characteristics,
    gameStatus
  );
});

test('menuItem should contain all characteristics info', () => {
  expect(screen.getByText('100')).toBeInTheDocument();
  expect(screen.getByAltText('shelving')).toBeInTheDocument();

  expect(screen.getByText('-500₴')).toBeInTheDocument();
  expect(screen.getByAltText('money')).toBeInTheDocument();
});
