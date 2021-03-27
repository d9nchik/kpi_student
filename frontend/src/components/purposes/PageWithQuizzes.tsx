import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, likePost } from '../../utilities/dataStorage';

const PageWithQuizzes: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [quizzes, setQuizzes] = useState(getQuizzes(page));
  return (
    <div>
      <ul>
        {quizzes.map(({ likes, id, quizName }) => {
          return (
            <li key={JSON.stringify(`${likes} ${id} ${quizName}`)}>
              <h3>{quizName}</h3>
              <button
                onClick={() => {
                  likePost(id);
                  setQuizzes(getQuizzes(0));
                }}
              >
                {likes} Like
              </button>
              <Link to={`/purposes/${id}`}>Watch more</Link>
            </li>
          );
        })}
      </ul>
      {quizzes.length === 10 && (
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next page
        </button>
      )}
      {page !== 0 && (
        <button onClick={() => setPage(page - 1)}>Previous</button>
      )}
    </div>
  );
};

export default PageWithQuizzes;
