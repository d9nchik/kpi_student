import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./data/dataStorage.ts');
jest.mock('./data/tools.ts');
jest.mock('./data/auth.ts');

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { level: 1 });
  expect(linkElement).toHaveTextContent('Welcome to game KPI Student!');
  expect(true).toBeTruthy();
});
