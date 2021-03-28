import React, { FunctionComponent } from 'react';
import { getCommentsOfQuiz } from '../../utilities/dataStorage';
import Comment from './Comment';

interface IProps {
  id: string;
}

const Comments: FunctionComponent<IProps> = ({ id }: IProps) => {
  const comments = getCommentsOfQuiz(id);
  return (
    <ul>
      {comments.map(comment => (
        <Comment {...comment} key={comment.id + comment.content} />
      ))}
    </ul>
  );
};

export default Comments;
