import React, { FunctionComponent, useState } from 'react';
import {
  addQuiz,
  AnswerVariant as AnswerVariantType,
} from '../../utilities/dataStorage';
import { useHistory } from 'react-router-dom';

import AnswerVariants from './AnswerVariants';

const AddQuiz: FunctionComponent = () => {
  const history = useHistory();
  const [quizName, setQuizName] = useState('');
  const [imageFile, setImageFile] = useState('');
  let answers: AnswerVariantType[] = [];

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addQuiz({ quizName, imageURL: imageFile, answerVariants: answers });
        history.push('/purposes');
      }}
    >
      <label>
        Quiz Name
        <input
          type="text"
          value={quizName}
          onChange={e => setQuizName(e.target.value)}
          required
        />
      </label>
      <label>
        Image
        <input
          type="file"
          value={imageFile}
          accept=".jpg, .jpeg, .png"
          onChange={e => setImageFile(e.target.value)}
        />
      </label>
      <AnswerVariants
        setAnswers={answ => {
          answers = answ;
        }}
      />
      <input type="submit" value="Add quiz" />
    </form>
  );
};

export default AddQuiz;
