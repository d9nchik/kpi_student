import React, { FunctionComponent } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App: FunctionComponent = () => {
  return (
    <div>
      <h1>Welcome to game KPI Student!</h1>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
