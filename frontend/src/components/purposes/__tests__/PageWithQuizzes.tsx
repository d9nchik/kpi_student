import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import PageWithQuizzes from '../PageWithQuizzes';
import { Router } from 'react-router-dom';
import { likePost } from '../../../data/dataStorage';

jest.mock('../../../data/dataStorage.ts');

test('user should see all quizzes at page', async () => {
  const history = createMemoryHistory();
  await renderPageWithHistory(history);

  expect(screen.getByText('Exam')).toBeInTheDocument();
});

test('user should be able to vote', async () => {
  const history = createMemoryHistory();
  await renderPageWithHistory(history);

  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('like'));
  expect(likePost).toBeCalledTimes(1);
  expect(likePost).toBeCalledWith('zjdejwljwfwfnwtrjktbtww');
  expect(await screen.findByText('Likes: 6')).toBeInTheDocument();
});

test("if we have few quizzes, button more shouldn't be displayed", async () => {
  const history = createMemoryHistory();
  await renderPageWithHistory(history);

  expect(screen.queryByRole('button')).toBeNull();
});

test('whe user click on comment, he/she should be redirected to detail page', async () => {
  const history = createMemoryHistory();
  await renderPageWithHistory(history);

  fireEvent.click(screen.getByAltText('comment'));
  expect(history.location.pathname).toBe('/purposes/zjdejwljwfwfnwtrjktbtww');
});

async function renderPageWithHistory(history: MemoryHistory<unknown>) {
  await act(async () => {
    render(
      <Router history={history}>
        <PageWithQuizzes />
      </Router>
    );
  });
}
