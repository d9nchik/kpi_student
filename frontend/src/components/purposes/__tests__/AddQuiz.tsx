import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddQuiz from '../AddQuiz';
import { addQuiz } from '../../../data/dataStorage';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const nameOfQuiz = 'New Quiz test';
jest.mock('../../../data/dataStorage.ts');
jest.mock('../../../data/tools.ts');

test('When user write quiz name field,this name should be displayed', () => {
  render(<AddQuiz />);
  fireEvent.input(screen.getByLabelText('Quiz Name', { selector: 'input' }), {
    target: { value: nameOfQuiz },
  });
  expect(screen.getByLabelText('Quiz Name', { selector: 'input' })).toHaveValue(
    nameOfQuiz
  );
});
test('User should have ability to send quiz without image', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <AddQuiz />
    </Router>
  );
  fireEvent.click(screen.getByText('Add answer variant'));
  fireEvent.input(screen.getByLabelText('Answer name'), {
    target: { value: 'History' },
  });
  fireEvent.input(screen.getByLabelText('Quiz Name', { selector: 'input' }), {
    target: { value: nameOfQuiz },
  });
  fireEvent.click(screen.getByDisplayValue('Add quiz'));
  expect(addQuiz).toBeCalledTimes(1);
  expect(addQuiz).toBeCalledWith({
    answerVariants: [],
    imageURL: '',
    quizName: nameOfQuiz,
  });
});
// test('User should have ability to send quiz with image', async () => {
//   await act(async () => {
//     const file = new File(['hello'], 'hello.png', { type: 'image/png' });
//     const history = createMemoryHistory();
//     render(
//       <Router history={history}>
//         <AddQuiz />
//       </Router>
//     );
//     const input = screen.getByLabelText('Image', { selector: 'input' });
//     userEvent.upload(input, file);
//     fireEvent.input(screen.getByLabelText('Quiz Name', { selector: 'input' }), {
//       target: { value: 'New Quiz test' },
//     });
//     fireEvent.click(screen.getByDisplayValue('Add quiz'));
//     expect(addQuiz).toBeCalledTimes(1);
//     expect(addQuiz).toBeCalledWith({
//       answerVariants: [],
//       imageURL: '',
//       quizName: 'New Quiz test',
//     });
//   });

//expect(input.files[0]).toStrictEqual(file);
//expect(input.files.item(0)).toStrictEqual(file);
//expect(input.files).toHaveLength(1);
//});
