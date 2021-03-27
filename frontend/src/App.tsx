import React, { FunctionComponent } from 'react';
import './App.css';
import Authentication from './components/auth/Authentication';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import PurposeAndVote from './components/purposes/PurposeAndVote';
const App: FunctionComponent = () => {
  return (
    <div>
      <h1>Welcome to game KPI Student!</h1>
      <Router>
        <Authentication />
        <AuthenticatedRouter>
          <Switch>
            <Route path="/main" render={() => <div>main page</div>} />
            <Route path="/purposes" component={PurposeAndVote} />
          </Switch>
        </AuthenticatedRouter>
      </Router>
    </div>
  );
};

export default App;
