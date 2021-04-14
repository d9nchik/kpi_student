import React, { FunctionComponent, useState } from 'react';

import Like from './img/like.png';
import Dislike from './img/dislike.png';

import './Votes.css';

interface IProps {
  likes: number;
  isPostLiked: boolean;
  onLike: () => Promise<boolean>;
  onDislike: () => Promise<boolean>;
}

const Vote: FunctionComponent<IProps> = ({
  likes,
  onLike,
  onDislike,
  isPostLiked,
}: IProps) => {
  const [ourLikes, setLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(isPostLiked);
  return (
    <div className="votes">
      Likes: {ourLikes}
      {!isLiked ? (
        <button
          onClick={async () => {
            if (onLike()) {
              setIsLiked(true);
              setLikes(ourLikes + 1);
            }
          }}
        >
          <img src={Like} alt="like" />
        </button>
      ) : (
        <button
          onClick={async () => {
            if (onDislike()) {
              setIsLiked(false);
              setLikes(ourLikes - 1);
            }
          }}
        >
          <img src={Dislike} alt="dislike" />
        </button>
      )}
    </div>
  );
};

export default Vote;
