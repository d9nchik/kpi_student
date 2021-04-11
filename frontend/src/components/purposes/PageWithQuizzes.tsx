import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getQuizzes,
  likePost,
  dislikePost,
  isPostLiked,
  Quiz,
} from '../../utilities/dataStorage';
import Vote from './Vote';
import './PageWithQuizzes.css';

const PageWithQuizzes: FunctionComponent = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (quizzes.length === 0) {
      (async () => setQuizzes(await getQuizzes()))();
    }
  });

  return (
    <div id={'ListProp'}>
      <ul id={'ListQuizzes'}>
        {quizzes.map(({ likes, id: uid, quizName, commentsCount }) => {
          return (
            <li key={JSON.stringify(`${likes} ${uid} ${quizName}`)}>
              <h3>{quizName}</h3>
              <Vote
                isPostLiked={isPostLiked(uid)}
                onLike={() => likePost(uid)}
                onDislike={() => dislikePost(uid)}
                likes={likes}
              />
              <Link to={`/purposes/${uid}`}>{commentsCount} comments</Link>
            </li>
          );
        })}
      </ul>
      <div id={'prevNext'}>
        {quizzes.length === 10 && (
          <button
            onClick={async () => {
              setQuizzes([
                ...quizzes,
                ...(await getQuizzes(quizzes[quizzes.length - 1].quizName)),
              ]);
            }}
          >
            More
          </button>
        )}
      </div>
      <Link id={'addProp'} to="/purposes/add">
        Add quiz
      </Link>
    </div>
  );
};

export default PageWithQuizzes;
