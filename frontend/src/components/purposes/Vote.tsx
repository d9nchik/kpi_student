import React, { FunctionComponent, useState } from 'react';

interface IProps {
  likes: number;
  isPostLiked: boolean;
  onLike: () => boolean;
  onDislike: () => boolean;
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
    <div>
      Likes: {ourLikes}
      {!isLiked ? (
        <button
          onClick={() => {
            if (onLike()) {
              setIsLiked(true);
              setLikes(ourLikes + 1);
            }
          }}
        >
          Like
        </button>
      ) : (
        <button
          onClick={() => {
            if (onDislike()) {
              setIsLiked(false);
              setLikes(ourLikes - 1);
            }
          }}
        >
          Dislike
        </button>
      )}
    </div>
  );
};

export default Vote;
