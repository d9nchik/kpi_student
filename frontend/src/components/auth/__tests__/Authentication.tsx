import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Authentication from '../Authentication';
import { Router } from 'react-router-dom';

jest.mock('../../../data/auth.ts');

test('at /login user should see login page', () => {
  const history = createMemoryHistory();
  history.push('/login');
  render(
    <Router history={history}>
      <Authentication />
    </Router>
  );

  expect(screen.getByAltText('Google logo')).toBeInTheDocument();
});

test('at /register user should see register page', () => {
  const history = createMemoryHistory();
  history.push('/register');
  render(
    <Router history={history}>
      <Authentication />
    </Router>
  );
  expect(screen.getByDisplayValue('Register')).toBeInTheDocument();
});

test('at /resetPass user should see reset password page', () => {
  const history = createMemoryHistory();
  history.push('/resetPass');
  render(
    <Router history={history}>
      <Authentication />
    </Router>
  );

  expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
});
