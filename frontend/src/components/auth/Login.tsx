import React, { FunctionComponent, useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import {
  isAuthenticated,
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
} from '../../utilities/auth';

import GitHub from './GitHub.png';
import Google from './google.png';
import './Login.css';

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  return (
    <div id={'mainBlockLogin'}>
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
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <input id={'buttonLogIn'} type="submit" value="Login" />
      </form>
      <div id={'linkForgot'}>
        <Link to="/register"> Don`t have account</Link>
        <Link to="/resetPass">Forgot password</Link>
      </div>
      <div id={'imgLogo'}>
        <p
          onClick={async () => {
            if (await loginWithGoogle()) {
              goToMainPage();
            } else {
              setMessage('Problems with login via GOOGLE');
            }
          }}
        >
          <img src={Google} alt="Google logo" />
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
          <img src={GitHub} alt="GitHub logo" />
        </p>
      </div>
    </div>
  );

  function goToMainPage() {
    history.push('/');
  }
};

export default Login;
