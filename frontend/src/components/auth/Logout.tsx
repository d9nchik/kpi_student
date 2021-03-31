import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../utilities/auth';

const Logout: FunctionComponent = () => {
  logout();
  return <Redirect to={{ pathname: '/login', state: { from: '/logout' } }} />;
};

export default Logout;
