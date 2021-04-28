import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import PurposeAndVote from '../PurposeAndVote';
import { Router } from 'react-router-dom';

jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/auth.ts');

test('at /purposes users should see PageWithQuizzes page', async () => {
  const history = createMemoryHistory();
  history.push('/purposes');
  await renderComponentWithHistory(history);
  await act(async () => {
    fireEvent.click(screen.getByAltText('comment'));
    expect(history.location.pathname).toBe('/purposes/zjdejwljwfwfnwtrjktbtww');
  });
});

test('at /purposes/add user should see AddQuiz', async () => {
  const history = createMemoryHistory();
  history.push('/purposes/add');
  await renderComponentWithHistory(history);
  expect(await screen.findByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('at /purposes/:id user should see WatchIdea', async () => {
  const history = createMemoryHistory();
  history.push('/purposes/jfkjdfkdjf');
  await renderComponentWithHistory(history);
  expect(screen.getByText('Cool!')).toBeInTheDocument();
  expect(screen.getByText('Pedro')).toBeInTheDocument();
  expect(screen.getByText('Awesome!')).toBeInTheDocument();
  expect(screen.getByText('Sebastian')).toBeInTheDocument();
});

async function renderComponentWithHistory(history: MemoryHistory<unknown>) {
  await act(async () => {
    render(
      <Router history={history}>
        <PurposeAndVote />
      </Router>
    );
  });
}
