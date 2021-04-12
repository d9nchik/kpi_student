import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import {
  getQuiz,
  likePost,
  dislikePost,
  isPostLiked,
  Quiz,
} from '../../utilities/dataStorage';
import defaultImage from '../../logo.svg';

import Vote from './Vote';
import Comments from './Comments';
import WatchCharacteristics from './WatchCharacteristics';
import Loading from '../Loading';

interface ParamTypes {
  id: string;
}

const WatchIdea: FunctionComponent = () => {
  const { id } = useParams<ParamTypes>();
  const location = useLocation();
  const [quiz, setQuiz] = useState<Quiz | null | undefined>(null);

  useEffect(() => {
    if (quiz === null) {
      (async () => setQuiz(await getQuiz(id)))();
    }
  });

  if (quiz === null) {
    return <Loading />;
  }

  if (!quiz) {
    return (
      <Redirect to={{ pathname: '/purposes', state: { from: location } }} />
    );
  }
  const {
    quizName,
    likes,
    commentsCount,
    answerVariants,
    author,
    imageURL,
  } = quiz;

  return (
    <div>
      <h2>{quizName}</h2>
      <img alt={quizName} src={imageURL || defaultImage} />
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
