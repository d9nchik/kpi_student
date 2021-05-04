import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { isAuthenticated, logout, loginWithGithub } from '../../../data/auth';

jest.mock('../../../data/auth.ts');

afterEach(logout);

test('login with github', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  fireEvent.click(screen.getByAltText('GitHub logo'));
  expect(isAuthenticated).toBeTruthy();
});

test('login with google', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  fireEvent.click(screen.getByAltText('Google logo'));
  expect(isAuthenticated).toBeTruthy();
});

test('login with email', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  fireEvent.change(screen.getByLabelText('E-mail', { selector: 'input' }), {
    target: {
      value: 'coolman@gmail.com',
    },
  });
  fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), {
    target: {
      value: '123',
    },
  });
  fireEvent.click(screen.getByDisplayValue('Login'));
  expect(isAuthenticated()).toBeTruthy();
});

test('if user is authenticate he should be redirected to main page', async () => {
  const history = createMemoryHistory();
  await loginWithGithub();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(history.location.pathname).toBe('/');
});
