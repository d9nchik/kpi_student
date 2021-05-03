import React from 'react';
import { render, screen } from '@testing-library/react';
import WatchCharacteristic from '../WatchCharacterstic';

jest.mock('../../../data/dataStorage.ts');

test('WatchCharacteristic has minValue and max value', () => {
  render(<WatchCharacteristic minValue={3} maxValue={5} name="age" />);
  expect(screen.getByText('age -> 3 <-> 5')).toBeInTheDocument();
});

test('WatchCharacteristic has only minValue', () => {
  render(<WatchCharacteristic maxValue={5} name="age" />);
  expect(screen.getByText('age < 5')).toBeInTheDocument();
});

test('WatchCharacteristic has only maxValue', () => {
  render(<WatchCharacteristic minValue={3} name="age" />);
  expect(screen.getByText('age > 3')).toBeInTheDocument();
});

test('no value is passed to WatchCharacteristics', () => {
  render(<WatchCharacteristic name="age" />);
  expect(screen.queryByRole('listitem')).toBeNull();
});
