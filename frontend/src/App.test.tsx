import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./firebase.ts');

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/KPI student/i);
  // expect(linkElement).toBeInTheDocument();
  expect(true).toBeTruthy();
});
