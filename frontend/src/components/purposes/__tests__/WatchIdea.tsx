import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import WatchIdea from '../WatchIdea';
import { Router } from 'react-router-dom';

jest.mock('../../../data/dataStorage.ts');

beforeEach(async () => {
  const history = createMemoryHistory();
  history.push('/purposes/qazwsxedc');
  await act(async () => {
    render(
      <Router history={history}>
        <WatchIdea />
      </Router>
    );
  });
});

test('WatchIdea should contain quizName', () => {
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Exam');
});

test('WatchIdea should contain author name', () => {
  expect(screen.getByText('Author: Artem')).toBeInTheDocument();
});

test('Image of quiz should be present on page', () => {
  expect(screen.getByAltText('Exam')).toBeInTheDocument();
});

test('WatchCharacteristics should be on WatchIdea', () => {
  expect(screen.getByText('Education Level > 700')).toBeInTheDocument();
});

test('Comments of quiz should be present on page', () => {
  expect(screen.getByText('Cool!')).toBeInTheDocument();
  expect(screen.getByText('Pedro')).toBeInTheDocument();
});

test('Vote component should be on the page', () => {
  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
});
