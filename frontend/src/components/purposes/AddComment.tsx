import React, { FunctionComponent, useState } from 'react';

interface IProps {
  onComment: (content: string) => void;
}

const AddComment: FunctionComponent<IProps> = ({ onComment }: IProps) => {
  const [userComment, setUserComment] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onComment(userComment);
        setUserComment('');
      }}
    >
      <textarea
        onChange={ev => setUserComment(ev.target.value)}
        required
        value={userComment}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddComment;
