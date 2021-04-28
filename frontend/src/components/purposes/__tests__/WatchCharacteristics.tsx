import React from 'react';
import { render, screen } from '@testing-library/react';
import WatchCharacteristics from '../WatchCharacteristics';
import { Characteristic } from '../../../data/dataStorage';

jest.mock('../../../data/dataStorage.ts');
const characteristics: Characteristic = {
  money: { minValue: -150 },
  mentalStrength: { maxValue: -200 },
  heartsPoint: { minValue: -300, maxValue: -200 },
};
test('user should see all available characteristics', () => {
  render(<WatchCharacteristics {...characteristics} />);
  expect(screen.getByText('Money, $ > -150')).toBeInTheDocument();
  expect(screen.getByText('Mental Strength < -200')).toBeInTheDocument();
  expect(screen.getByText('Hearts Point -> -300 <-> -200')).toBeInTheDocument();
});
