import React, { FunctionComponent, useState } from 'react';
import { isAuthenticated, registerEmail } from '../utilities/auth';
import { Redirect, useHistory, Link } from 'react-router-dom';

const Register: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  return (
    <div>
      <h2>Register page</h2>
      <h3>{message}</h3>
      {isAuthenticated() && (
        <Redirect to={{ pathname: '/', state: { from: '/register' } }} />
      )}
      <form
        onSubmit={event => {
          event.preventDefault();
          if (password !== retypedPassword) {
            setMessage('Password not matches retyped password');
            setPassword('');
            setRetypedPassword('');
          } else if (registerEmail(email, password)) {
            history.push('/');
          } else {
            setMessage('user with this email exists');
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
        <label>
          Retype Password
          <input
            type="password"
            name="retype password"
            value={retypedPassword}
            onChange={event => setRetypedPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">I already have account</Link>
    </div>
  );
};

export default Register;
