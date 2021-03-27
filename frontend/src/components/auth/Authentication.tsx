import React, { FunctionComponent } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

const Authentication: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetPass" component={ResetPassword} />
      </Switch>
    </Router>
  );
};

export default Authentication;
