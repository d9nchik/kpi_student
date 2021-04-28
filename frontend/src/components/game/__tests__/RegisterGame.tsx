import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { getGameObj } from '../../../data/dataStorage';
import RegisterGame from '../RegisterGame';

jest.mock('../../../data/dataStorage.ts');

test('correct set name of character', async () => {
  const characterName = 'Denis';
  render(<RegisterGame />);
  const textField = screen.getByLabelText(/Name of Character/i, {
    selector: 'input',
  });
  fireEvent.change(textField, { target: { value: characterName } });
  fireEvent.submit(textField);
  const gameObj = await getGameObj();
  expect(gameObj).toBeTruthy();
  if (!gameObj) return;
  const { characterName: newCharacterName } = gameObj;
  expect(newCharacterName).toBe(characterName);
});
