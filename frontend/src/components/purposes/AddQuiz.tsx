import React, { FunctionComponent, useState, useRef } from 'react';
import {
  addQuiz,
  AnswerVariant as AnswerVariantType,
  uploadImage,
} from '../../utilities/dataStorage';
import { useHistory } from 'react-router-dom';

import AnswerVariants from './AnswerVariants';

const AddQuiz: FunctionComponent = () => {
  const history = useHistory();
  const [quizName, setQuizName] = useState('');
  const imageFile = useRef<HTMLInputElement>(null);
  let answers: AnswerVariantType[] = [];

  return (
    <form
      onSubmit={async e => {
        let newLink = '';
        e.preventDefault();
        if (
          imageFile.current &&
          imageFile.current.files &&
          imageFile.current.files[0]
        ) {
          newLink = await uploadImage(imageFile.current.files[0]);
        }
        addQuiz({ quizName, imageURL: newLink, answerVariants: answers });
        history.push('/purposes');
      }}
    >
      <h2>Add quiz</h2>
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
          accept=".jpg, .jpeg, .png"
          ref={imageFile}
          required
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
