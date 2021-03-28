import React, { FunctionComponent, useState } from 'react';
import { getCommentsOfQuiz, addComment } from '../../utilities/dataStorage';

import Comment from './Comment';
import AddComment from './AddComment';

interface IProps {
  id: string;
  commentsCount: number;
}

const Comments: FunctionComponent<IProps> = ({ id, commentsCount }: IProps) => {
  const comments = getCommentsOfQuiz(id);
  const [count, setCount] = useState(commentsCount);
  const comment = (content: string) => {
    addComment(id, content);
    setCount(count + 1);
  };
  return (
    <div>
      <h3>Comments ({count})</h3>
      <ul>
        {comments.map(comment => (
          <Comment {...comment} key={comment.id + comment.content} />
        ))}
      </ul>
      Comment idea:
      <AddComment onComment={comment} />
    </div>
  );
};

export default Comments;
