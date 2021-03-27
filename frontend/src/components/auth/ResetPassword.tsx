import React, { FunctionComponent, useState } from 'react';
import { isAuthenticated, sendPasswordResetEmail } from '../../utilities/auth';
import { Redirect, useHistory } from 'react-router-dom';

const ResetPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  return (
    <div>
      <h2>Reset Password</h2>
      <h3>{message}</h3>
      {isAuthenticated() && (
        <Redirect to={{ pathname: '/', state: { from: '/login' } }} />
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (sendPasswordResetEmail(email)) {
            history.push('/');
          } else {
            setMessage('Check your email');
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default ResetPassword;
