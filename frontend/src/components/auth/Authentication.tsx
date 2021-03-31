import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Logout from './Logout';

const Authentication: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/resetPass" component={ResetPassword} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  );
};

export default Authentication;
