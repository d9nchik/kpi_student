import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import WatchIdea from '../WatchIdea';
import { Router } from 'react-router-dom';
import { likePost, dislikePost } from '../../../data/dataStorage';

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

test('user should be able to vote', () => {
  expect(likePost).toBeCalledTimes(0);
  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('like'));
  expect(likePost).toBeCalledTimes(1);

  expect(dislikePost).toBeCalledTimes(0);
  expect(screen.getByText('Likes: 6')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('dislike'));
  expect(dislikePost).toBeCalledTimes(1);
  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
});
