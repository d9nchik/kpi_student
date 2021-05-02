import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../firebase.ts');

const email = `smb${new Date().getMilliseconds()}.interesting@gmail.com`;

beforeEach(() => {
  act(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });
});

test('retyped password not match', async () => {
  await act(async () => {
    fireEvent.change(
      await screen.findByLabelText(/E-mail/i, { selector: 'input' }),
      {
        target: {
          value: email,
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText('Password', { selector: 'input' }),
      {
        target: {
          value: '1qaz2wsx',
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText(/Retype Password/i, { selector: 'input' }),
      {
        target: {
          value: '1qaz2wsx2',
        },
      }
    );
    fireEvent.click(await screen.findByDisplayValue('Register'));
  });

  expect(screen.getByText(/Password not matches/i)).toBeInTheDocument();
});

test('firebase errors should be shown to user', async () => {
  await act(async () => {
    fireEvent.change(
      await screen.findByLabelText(/E-mail/i, { selector: 'input' }),
      {
        target: {
          value: email,
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText('Password', { selector: 'input' }),
      {
        target: {
          value: '1qaz',
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText(/Retype Password/i, { selector: 'input' }),
      {
        target: {
          value: '1qaz',
        },
      }
    );
    fireEvent.click(await screen.findByDisplayValue('Register'));
  });

  expect(
    await screen.findByText(/Password should be at least 6 characters/)
  ).toBeInTheDocument();
});

test('user with email credentials should be able to register', async () => {
  await act(async () => {
    fireEvent.change(
      await screen.findByLabelText(/E-mail/i, { selector: 'input' }),
      {
        target: {
          value: email,
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText('Password', { selector: 'input' }),
      {
        target: {
          value: '1qaz2wsx',
        },
      }
    );
    fireEvent.change(
      await screen.findByLabelText(/Retype Password/i, { selector: 'input' }),
      {
        target: {
          value: '1qaz2wsx',
        },
      }
    );
    fireEvent.click(await screen.findByDisplayValue('Register'));
    expect((await screen.findByRole('heading', { level: 3 })).innerHTML).toBe(
      ''
    );
  });
});
