import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangeRange, { checkAndSetRange } from '../ChangeRange';

jest.mock('../../../data/dataStorage.ts');

test('user should be able to add ChangeRange', () => {
  render(
    <ChangeRange
      name="age"
      setRange={() => {
        return;
      }}
    />
  );

  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
});

const maxValueLabel = 'Maximal Value';
const minValueLabel = 'Minimal Value';

test('numbers should be displayed after render', () => {
  render(
    <ChangeRange
      name="age"
      setRange={() => {
        return;
      }}
      minValue={3}
      maxValue={5}
    />
  );

  expect(
    screen.getByLabelText(maxValueLabel, { selector: 'input' })
  ).toHaveValue(5);
  expect(
    screen.getByLabelText(minValueLabel, { selector: 'input' })
  ).toHaveValue(3);
});

test('user should have ability to remove property', () => {
  render(
    <ChangeRange
      name="age"
      setRange={() => {
        return;
      }}
      minValue={3}
      maxValue={5}
    />
  );

  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('age');
});

test('checkAndSetRange', () => {
  const setRange = jest.fn();

  checkAndSetRange(setRange);
  expect(setRange).toBeCalledTimes(1);
  expect(setRange).toBeCalledWith({});

  checkAndSetRange(setRange, 5, 3);
  expect(setRange).toBeCalledTimes(2);
  expect(setRange).toBeCalledWith({ minValue: 3, maxValue: 5 });
  checkAndSetRange(setRange, 3, 5);
  expect(setRange).toBeCalledTimes(2);

  checkAndSetRange(setRange, 5);
  expect(setRange).toBeCalledTimes(3);
  expect(setRange).toBeCalledWith({ maxValue: 5 });

  checkAndSetRange(setRange, undefined, 3);
  expect(setRange).toBeCalledTimes(4);
  expect(setRange).toBeCalledWith({ minValue: 3 });
});

test('if no minimal value is provided, it should set maxValue', () => {
  const setRange = jest.fn();
  render(<ChangeRange name="age" setRange={setRange} maxValue={5} />);

  fireEvent.change(
    screen.getByLabelText(maxValueLabel, { selector: 'input' }),
    { target: { value: '123' } }
  );
  expect(setRange).toBeCalledWith({ maxValue: 123 });
});

test('if no maximal value is provided, it should set minValue', () => {
  const setRange = jest.fn();
  render(<ChangeRange name="age" setRange={setRange} minValue={3} />);

  fireEvent.change(
    screen.getByLabelText(minValueLabel, { selector: 'input' }),
    { target: { value: '123' } }
  );
  expect(setRange).toBeCalledWith({ minValue: 123 });
});

test('if not correct maximal is provided, nothing should be done', () => {
  const setRange = jest.fn();
  render(<ChangeRange name="age" setRange={setRange} maxValue={5} />);

  fireEvent.change(
    screen.getByLabelText(maxValueLabel, { selector: 'input' }),
    { target: { value: 'fdskjfksjd' } }
  );
  expect(setRange).toHaveBeenCalledTimes(1);
});

test('if not correct minimal is provided, nothing should be done', () => {
  const setRange = jest.fn();
  render(<ChangeRange name="age" setRange={setRange} minValue={3} />);

  fireEvent.change(
    screen.getByLabelText(minValueLabel, { selector: 'input' }),
    { target: { value: 'fdskjfksjd' } }
  );
  expect(setRange).toHaveBeenCalledTimes(1);
});
