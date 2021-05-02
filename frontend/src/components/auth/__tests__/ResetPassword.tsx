import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ResetPassword from '../ResetPassword';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../data/auth.ts');

beforeEach(() => {
  act(() => {
    render(
      <Router>
        <ResetPassword />
      </Router>
    );
  });
});

test('user should see error messages', async () => {
  fireEvent.change(screen.getByLabelText(/E-mail/i, { selector: 'input' }), {
    target: { value: 'not valid email' },
  });

  fireEvent.click(await screen.findByDisplayValue('Send'));

  expect((await screen.findByRole('heading', { level: 3 })).innerHTML).toBe(
    'Not valid email'
  );
});

test('user with valid email should get no error', async () => {
  fireEvent.change(screen.getByLabelText(/E-mail/i, { selector: 'input' }), {
    target: { value: 'der@gmail.com' },
  });

  fireEvent.click(await screen.findByDisplayValue('Send'));

  expect((await screen.findByRole('heading', { level: 3 })).innerHTML).toBe('');
});
