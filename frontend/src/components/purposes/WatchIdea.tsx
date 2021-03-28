import React, { FunctionComponent } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { getQuiz, likePost, dislikePost } from '../../utilities/dataStorage';

import Vote from './Vote';
import Comments from './Comments';

interface ParamTypes {
  id: string;
}

const WatchIdea: FunctionComponent = () => {
  const { id } = useParams<ParamTypes>();
  const location = useLocation();
  const quiz = getQuiz(id);
  if (!quiz) {
    return (
      <Redirect to={{ pathname: '/purposes', state: { from: location } }} />
    );
  }
  const {
    quizName,
    imageURL,
    likes,
    commentsCount,
    answerVariants,
    author,
  } = quiz;

  return (
    <div>
      <h2>{quizName}</h2>
      <img alt={quizName} src={imageURL} />
      <ul>
        {answerVariants?.map(
          ({
            name,
            requirements,
            successCharacteristics,
            successProbability,
            loseCharacteristics,
          }) => {
            return (
              <li key={`${name} ${successProbability}`}>
                <h3>{name}</h3>
                <em>{successProbability * 100}%</em>
              </li>
            );
          }
        )}
      </ul>
      Author: {author.displayName}
      <br />
      <Vote
        onLike={() => likePost(id)}
        onDislike={() => dislikePost(id)}
        likes={likes}
      />
      <Comments id={id} commentsCount={commentsCount} />
    </div>
  );
};

export default WatchIdea;
