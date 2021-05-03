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

beforeEach(() => render(<Comment {...commentProps} />));

test('comment should contain author and content information', () => {
  expect(screen.getByText('Senior developer')).toBeInTheDocument();
  expect(screen.getByText('OMG!')).toBeInTheDocument();
});
