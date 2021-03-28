import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageWithQuizzes from './PageWithQuizzes';
import WatchIdea from './WatchIdea';

const PurposeAndVotes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/purposes" component={PageWithQuizzes} />
      <Route path="/purposes/:id" component={WatchIdea}></Route>
    </Switch>
  );
};

export default PurposeAndVotes;
