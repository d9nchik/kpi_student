import React, { FunctionComponent, useState } from 'react';
import {
  isAuthenticated,
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
} from '../utilities/auth';
import { Redirect, useHistory } from 'react-router-dom';

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  return (
    <div>
      {isAuthenticated() && (
        <Redirect to={{ pathname: '/', state: { from: '/login' } }} />
      )}
      <h2>Login Page</h2>
      <h3>{message}</h3>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!loginWithEmail(email, password)) {
            setMessage('Check your email and password');
          } else {
            goToMainPage();
          }
        }}
      >
        <label>
          E-mail
          <input
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
      <p
        onClick={() => {
          if (loginWithGoogle()) {
            goToMainPage();
          } else {
            setMessage('Problems with login via GOOGLE');
          }
        }}
      >
        Login with Google
      </p>

      <p
        onClick={() => {
          if (loginWithGithub()) {
            goToMainPage();
          } else {
            setMessage('Problems with login via GitHub');
          }
        }}
      >
        Login with GitHub
      </p>
    </div>
  );

  function goToMainPage() {
    history.push('/');
  }
};

export default Login;
