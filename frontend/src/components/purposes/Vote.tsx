import React, { FunctionComponent, useState } from 'react';

interface IProps {
  likes: number;
  onLike: () => void;
  onDislike: () => void;
}

const Vote: FunctionComponent<IProps> = ({
  likes,
  onLike,
  onDislike,
}: IProps) => {
  const [ourLikes, setLikes] = useState(likes);
  return (
    <div>
      Likes: {ourLikes}
      <button
        onClick={() => {
          onLike();
          setLikes(ourLikes + 1);
        }}
      >
        Like
      </button>
      <button
        onClick={() => {
          onDislike();
          setLikes(ourLikes - 1);
        }}
      >
        Dislike
      </button>
    </div>
  );
};

export default Vote;
