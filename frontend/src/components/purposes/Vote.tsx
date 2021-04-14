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
        <img
          onClick={async () => {
            if (onLike()) {
              setIsLiked(true);
              setLikes(ourLikes + 1);
            }
          }}
          src={Dislike}
          alt="like"
        />
      ) : (
        <img
          onClick={async () => {
            if (onDislike()) {
              setIsLiked(false);
              setLikes(ourLikes - 1);
            }
          }}
          src={Like}
          alt="dislike"
        />
      )}
    </div>
  );
};

export default Vote;
