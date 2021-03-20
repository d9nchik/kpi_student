import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  subscribeOnCommentsOfQuiz,
  addComment,
  Comment as CommentType,
} from '../../data/dataStorage';

import Comment from './Comment';
import AddComment from './AddComment';
import Loading from '../Loading';

interface IProps {
  id: string;
  commentsCount: number;
}

const Comments: FunctionComponent<IProps> = ({ id, commentsCount }: IProps) => {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [count, setCount] = useState(commentsCount);
  const comment = (content: string) => {
    addComment(id, content);
    setCount(count + 1);
  };

  useEffect(() => subscribeOnCommentsOfQuiz(id, setComments), [id]);

  if (!comments) {
    return <Loading />;
  }

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
