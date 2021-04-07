import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getQuizzes,
  likePost,
  dislikePost,
  isPostLiked,
} from '../../utilities/dataStorage';
import Vote from './Vote';
import './PageWithQuizzes.css';

const PageWithQuizzes: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const quizzes = getQuizzes(page);

  return (
    <div id={'ListProp'}>
      <ul id={'ListQuizzes'}>
        {quizzes.map(({ likes, id, quizName, commentsCount }) => {
          return (
            <li key={JSON.stringify(`${likes} ${id} ${quizName}`)}>
              <h3>{quizName}</h3>
              <Vote
                isPostLiked={isPostLiked(id)}
                onLike={() => likePost(id)}
                onDislike={() => dislikePost(id)}
                likes={likes}
              />
              <Link to={`/purposes/${id}`}>{commentsCount} comments</Link>
            </li>
          );
        })}
      </ul>
      <div id={'prevNext'}>
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

      <Link id={'addProp'} to="/purposes/add">
        Add quiz
      </Link>
    </div>
  );
};

export default PageWithQuizzes;
