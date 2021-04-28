import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddComment from '../AddComment';

test('user shoul have ability to share comment', () => {
  const onComment = jest.fn();
  render(<AddComment onComment={onComment} />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Nice idea' },
  });
  fireEvent.click(screen.getByDisplayValue('Submit'));

  expect(onComment).toBeCalledTimes(1);
  expect(onComment).toBeCalledWith('Nice idea');
});
