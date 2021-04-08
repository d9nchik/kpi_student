import React, { FunctionComponent, useState } from 'react';
import { isAuthenticated, sendPasswordResetEmail } from '../../utilities/auth';
import { Redirect, useHistory } from 'react-router-dom';

import './ResetPassword.css';

const ResetPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  return (
    <div id={'resetWindow'}>
      <h2>Reset Password</h2>
      <h3>{message}</h3>
      {isAuthenticated() && (
        <Redirect to={{ pathname: '/', state: { from: '/login' } }} />
      )}

      <form
        onSubmit={async e => {
          e.preventDefault();
          const result = await sendPasswordResetEmail(email);
          if (!result) {
            history.push('/');
          } else {
            setMessage(result);
          }
        }}
      >
        <label>
          E-mail (we will send reset link)
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <input id={'sendButton'} type="submit" value={'Send'} />
      </form>
    </div>
  );
};

export default ResetPassword;
