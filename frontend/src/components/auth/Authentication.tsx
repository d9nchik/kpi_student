import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

const Authentication: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/resetPass" component={ResetPassword} />
    </Switch>
  );
};

export default Authentication;
