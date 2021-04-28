import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnswerVariant from '../AnswerVariant';
import { AnswerVariant as Answer } from '../../../data/dataStorage';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');

const answerVariant: Answer = {
  name: 'Learn all',

  requirements: { educationLevel: { minValue: 700 } },

  successProbability: 1,

  successCharacteristics: {
    educationLevel: { minValue: 300, maxValue: 500 },
  },

  loseCharacteristics: {
    educationLevel: { minValue: 50, maxValue: 100 },

    heartsPoint: { minValue: -20, maxValue: -50 },
  },
};

test('all details of props should be shown', () => {
  render(
    <AnswerVariant
      {...answerVariant}
      setAnswer={() => {
        return;
      }}
    />
  );

  expect(
    screen.getByLabelText('Answer name', { selector: 'input' })
  ).toHaveValue(answerVariant.name);

  expect(
    screen.getByLabelText('Probability of success', { selector: 'input' })
  ).toHaveValue(answerVariant.successProbability);

  expect(screen.getByDisplayValue('700')).toBeInTheDocument();
});

test('when user change requirements, setAnswer should be called', () => {
  const setAnswer = jest.fn();
  render(<AnswerVariant {...answerVariant} setAnswer={setAnswer} />);

  fireEvent.input(screen.getByDisplayValue(700), {
    target: { value: 349 },
  });
  expect(setAnswer).toBeCalledTimes(1);
  expect(setAnswer).toBeCalledWith({
    ...answerVariant,
    requirements: { educationLevel: { minValue: 349 } },
  });
});

test('when user change success characteristics, setAnswer should be called', () => {
  const setAnswer = jest.fn();
  render(<AnswerVariant {...answerVariant} setAnswer={setAnswer} />);

  fireEvent.input(screen.getByDisplayValue(300), {
    target: { value: 456 },
  });
  expect(setAnswer).toBeCalledTimes(1);
  expect(setAnswer).toBeCalledWith({
    ...answerVariant,
    successCharacteristics: {
      educationLevel: { minValue: 456, maxValue: 500 },
    },
  });
});

test('when user change lose characteristic setAnswer should be called', () => {
  const setAnswer = jest.fn();
  render(<AnswerVariant {...answerVariant} setAnswer={setAnswer} />);

  fireEvent.input(screen.getByDisplayValue(100), {
    target: { value: 234 },
  });
  expect(setAnswer).toBeCalledTimes(1);
  expect(setAnswer).toBeCalledWith({
    ...answerVariant,
    loseCharacteristics: {
      educationLevel: { minValue: 50, maxValue: 234 },
      heartsPoint: { minValue: -20, maxValue: -50 },
    },
  });
});

test('when user change name setAnswer should be called', () => {
  const setAnswer = jest.fn();
  render(<AnswerVariant {...answerVariant} setAnswer={setAnswer} />);

  fireEvent.input(screen.getByLabelText('Answer name'), {
    target: { value: 'History' },
  });
  expect(setAnswer).toBeCalledTimes(1);
  expect(setAnswer).toBeCalledWith({ ...answerVariant, name: 'History' });
});

test('when user change success probability setAnswer should be called', () => {
  const setAnswer = jest.fn();
  render(<AnswerVariant {...answerVariant} setAnswer={setAnswer} />);

  fireEvent.input(screen.getByLabelText('Probability of success'), {
    target: { value: '0.45' },
  });
  expect(setAnswer).toBeCalledTimes(1);
  expect(setAnswer).toBeCalledWith({
    ...answerVariant,
    successProbability: 0.45,
  });
});
