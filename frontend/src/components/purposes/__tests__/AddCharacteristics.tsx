import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCharacteristics from '../AddCharacteristics';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');

test('passed down characteristics should be displayed', () => {
  render(
    <AddCharacteristics
      characteristic={{
        mentalStrength: { minValue: 234 },
        money: { maxValue: 346 },
      }}
      setCharacteristic={() => {
        return;
      }}
    />
  );

  expect(screen.getByDisplayValue('234')).toBeInTheDocument();
  expect(screen.getByDisplayValue('346')).toBeInTheDocument();
  expect(screen.getByText('Mental Strength')).toBeInTheDocument();
  expect(screen.getByText('Money')).toBeInTheDocument();
});

test('on update setCharacteristics should be called', () => {
  const setCharacteristics = jest.fn();
  render(
    <AddCharacteristics
      characteristic={{
        mentalStrength: { minValue: 234 },
        money: { maxValue: 346 },
      }}
      setCharacteristic={setCharacteristics}
    />
  );
  fireEvent.input(screen.getByDisplayValue('234'), {
    target: { value: '127' },
  });
  expect(setCharacteristics).toBeCalledWith({
    money: { maxValue: 346 },
    mentalStrength: { minValue: 127 },
  });
});
