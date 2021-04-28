import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Vote from '../Vote';

const onLike = jest.fn(async () => true);
const onDislike = jest.fn(async () => true);

beforeEach(() =>
  render(
    <Vote likes={5} isPostLiked={true} onLike={onLike} onDislike={onDislike} />
  )
);

test('Vote component should call onLike and onDislike', () => {
  expect(onDislike).toBeCalledTimes(0);
  fireEvent.click(screen.getByAltText('dislike'));
  expect(onDislike).toBeCalledTimes(1);

  expect(onLike).toBeCalledTimes(0);
  fireEvent.click(screen.getByAltText('like'));
  expect(onLike).toBeCalledTimes(1);
});

test('when user clicks on image count of likes changes', () => {
  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('dislike'));
  expect(screen.getByText('Likes: 4')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('like'));
  expect(screen.getByText('Likes: 5')).toBeInTheDocument();
});
