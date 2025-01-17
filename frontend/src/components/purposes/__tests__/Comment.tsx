import React from 'react';
import { render, screen } from '@testing-library/react';
import { Comment as CommentProps } from '../../../data/dataStorage';
import Comment from '../Comment';

jest.mock('../../../data/dataStorage.ts');

const commentProps: CommentProps = {
  id: '123',
  content: 'OMG!',
  author: {
    displayName: 'Senior developer',
    uid: '123qwe',
  },
};

test('comment should contain author and content information', () => {
  render(<Comment {...commentProps} />);
  expect(screen.getByText('Senior developer')).toBeInTheDocument();
  expect(screen.getByText('OMG!')).toBeInTheDocument();
});

test('if no display name, than incognito should be shown', () => {
  render(
    <Comment
      id={commentProps.id}
      content={commentProps.content}
      author={{ uid: '12wsx' }}
    />
  );
  expect(screen.getByText('incognito')).toBeInTheDocument();
  expect(screen.getByText('OMG!')).toBeInTheDocument();
});
