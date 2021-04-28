import React, { FunctionComponent, lazy, Suspense } from 'react';
import './App.css';
import './normalize.css';
import AuthenticatedRouter from './components/AuthenticatedRouter';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Authentication = lazy(() => import('./components/auth/Authentication'));
const Game = lazy(() => import('./components/game/Game'));
const PurposeAndVote = lazy(
  () => import('./components/purposes/PurposeAndVote')
);

const App: FunctionComponent = () => {
  return (
    <div>
      <Router>
        <Link to="/">
          <h1>Welcome to game KPI Student!</h1>
        </Link>
        <Suspense fallback={<h2>Loading</h2>}>
          <Authentication />
          <AuthenticatedRouter>
            <Switch>
              <Route exact path="/" component={Game} />
              <Route path="/purposes" component={PurposeAndVote} />
            </Switch>
          </AuthenticatedRouter>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
