import React, { FunctionComponent } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import {
  getQuiz,
  likePost,
  dislikePost,
  isPostLiked,
} from '../../utilities/dataStorage';
import defaultImage from '../../logo.svg';

import Vote from './Vote';
import Comments from './Comments';
import WatchCharacteristics from './WatchCharacteristics';

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
  const { quizName, likes, commentsCount, answerVariants, author } = quiz;

  return (
    <div>
      <h2>{quizName}</h2>
      <img alt={quizName} src={defaultImage} />
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
                <h4>Requirements</h4>
                <WatchCharacteristics {...requirements} />
                <h4>Success Loot</h4>
                <WatchCharacteristics {...successCharacteristics} />
                <h4>Loose Pay</h4>
                <WatchCharacteristics {...loseCharacteristics} />
              </li>
            );
          }
        )}
      </ul>
      Author: {author.displayName}
      <br />
      <Vote
        isPostLiked={isPostLiked(id)}
        onLike={() => likePost(id)}
        onDislike={() => dislikePost(id)}
        likes={likes}
      />
      <Comments id={id} commentsCount={commentsCount} />
    </div>
  );
};

export default WatchIdea;
