import React, { FunctionComponent, useState } from 'react';
import { newGame } from '../../utilities/dataStorage';

const RegisterGame: FunctionComponent = () => {
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        newGame(name);
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
