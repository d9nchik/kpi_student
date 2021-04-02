import React, { FunctionComponent } from 'react';
import './App.css';
import Authentication from './components/auth/Authentication';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PurposeAndVote from './components/purposes/PurposeAndVote';
import Game from './components/game/Game';

const App: FunctionComponent = () => {
  return (
    <div>
      <Router>
        <Link to="/">
          <h1>Welcome to game KPI Student!</h1>
        </Link>
        <Authentication />
        <AuthenticatedRouter>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/main" render={() => <div>main page</div>} />
            <Route path="/purposes" component={PurposeAndVote} />
          </Switch>
        </AuthenticatedRouter>
      </Router>
    </div>
  );
};

export default App;
