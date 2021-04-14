import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getQuizzes,
  likePost,
  dislikePost,
  isPostLiked,
  Quiz,
  subscribe,
  unsubscribe,
} from '../../utilities/dataStorage';
import Vote from './Vote';

import Comment from './img/comments.png';

import './PageWithQuizzes.css';

const PageWithQuizzes: FunctionComponent = () => {
  const [isUserDataLoaded, setUserDataLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (quizzes.length === 0) {
      (async () => setQuizzes(await getQuizzes(pageNumber)))();
    }
  });

  useEffect(() => {
    if (!isUserDataLoaded) {
      subscribe(() => setUserDataLoaded(true));
      return unsubscribe;
    }
  });

  return (
    <div id={'ListProp'}>
      <ul id={'ListQuizzes'}>
        {quizzes.map(({ likes, id, quizName, commentsCount }) => {
          const isLiked = isPostLiked(id);
          return (
            <li
              key={JSON.stringify(`${likes} ${id} ${quizName} ${isLiked}`)}
              className="quizPreview"
            >
              <h3>{quizName}</h3>
              <Vote
                isPostLiked={isLiked}
                onLike={() => likePost(id)}
                onDislike={() => dislikePost(id)}
                likes={likes}
              />
              <Link className={'comments'} to={`/purposes/${id}`}>
                {commentsCount}
                <img src={Comment} alt="comment" />
              </Link>
            </li>
          );
        })}
      </ul>
      <div id={'prevNext'}>
        {quizzes.length > 0 && quizzes.length % 10 === 0 && (
          <button
            onClick={async () => {
              setPageNumber(pageNumber + 1);
              setQuizzes([...(await getQuizzes(pageNumber))]);
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
