import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnswerVariants from '../AnswerVariants';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');
const addButtonName = 'Add answer variant';

test('User should add answer variant', () => {
  const setAnswers = jest.fn();
  render(<AnswerVariants setAnswers={setAnswers} />);
  fireEvent.click(screen.getByText(addButtonName));
  expect(setAnswers).toBeCalledTimes(1);
  expect(setAnswers).toBeCalledWith([
    {
      loseCharacteristics: {},
      name: '',
      requirements: {},
      successCharacteristics: {},
      successProbability: 0,
    },
  ]);
  fireEvent.click(screen.getByText(addButtonName));
  expect(setAnswers).toBeCalledTimes(2);
  expect(setAnswers).toBeCalledWith([
    {
      loseCharacteristics: {},
      name: '',
      requirements: {},
      successCharacteristics: {},
      successProbability: 0,
    },
    {
      loseCharacteristics: {},
      name: '',
      requirements: {},
      successCharacteristics: {},
      successProbability: 0,
    },
  ]);
});

test('If answer variant change setAnswer should be called', () => {
  const setAnswers = jest.fn();
  render(<AnswerVariants setAnswers={setAnswers} />);
  fireEvent.click(screen.getByText(addButtonName));
  fireEvent.input(screen.getByLabelText('Answer name'), {
    target: { value: 'History' },
  });
  expect(setAnswers).toBeCalledTimes(2);
  expect(setAnswers).toBeCalledWith([
    {
      loseCharacteristics: {},
      name: 'History',
      requirements: {},
      successCharacteristics: {},
      successProbability: 0,
    },
  ]);
});
