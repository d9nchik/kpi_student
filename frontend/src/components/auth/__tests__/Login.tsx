import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { isAuthenticated, logout } from '../../../data/auth';

jest.mock('../../../data/auth.ts');

afterEach(logout);

test('login with github', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  fireEvent.click(screen.getByAltText('GitHub logo'));
  expect(isAuthenticated).toBeTruthy();
});

test('login with google', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  fireEvent.click(screen.getByAltText('Google logo'));
  expect(isAuthenticated).toBeTruthy();
});

test('login with email', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(isAuthenticated()).toBeFalsy();
  screen.getByLabelText('E-mail', { selector: 'input' }).innerText =
    'coolman@gmail.com';
  screen.getByLabelText('Password', { selector: 'input' }).innerText = '123';
  fireEvent.click(screen.getByDisplayValue('Login'));
  expect(isAuthenticated()).toBeTruthy();
});
