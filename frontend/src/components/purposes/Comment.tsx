import React, { FunctionComponent } from 'react';
import { Comment as IProps } from '../../data/dataStorage';

const Comment: FunctionComponent<IProps> = ({
  id,
  content,
  author,
}: IProps) => {
  if (!author.displayName) {
    author.displayName = 'incognito';
  }
  return (
    <div>
      <em>{author.displayName}</em>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
