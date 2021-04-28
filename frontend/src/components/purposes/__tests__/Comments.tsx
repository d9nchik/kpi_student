import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { addComment } from '../../../data/dataStorage';
import Comments from '../Comments';

jest.mock('../../../data/dataStorage.ts');

beforeEach(() => render(<Comments id="123qwe" commentsCount={2} />));

test('user should see total amounts of comments', () => {
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    'Comments (2)'
  );
});

test('user should see all written comments', () => {
  expect(screen.getByText('Cool!')).toBeInTheDocument();
  expect(screen.getByText('Pedro')).toBeInTheDocument();
  expect(screen.getByText('Awesome!')).toBeInTheDocument();
  expect(screen.getByText('Sebastian')).toBeInTheDocument();
});

test('user should see AddComment component', () => {
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Nice idea' },
  });
  fireEvent.click(screen.getByDisplayValue('Submit'));

  expect(addComment).toBeCalledTimes(1);
  expect(addComment).toBeCalledWith('123qwe', 'Nice idea');
});
