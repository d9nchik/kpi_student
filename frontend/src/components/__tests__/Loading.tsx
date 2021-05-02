import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

test('renders Loading page', () => {
  render(<Loading />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
