import React, { FunctionComponent, useState } from 'react';

interface IProps {
  makeNewGame: (nameOfCharacter: string) => void;
}

const RegisterGame: FunctionComponent<IProps> = ({ makeNewGame }: IProps) => {
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        makeNewGame(name);
      }}
    >
      <label>
        Name of Character
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
    </form>
  );
};

export default RegisterGame;
