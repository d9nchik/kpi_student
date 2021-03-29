import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageWithQuizzes from './PageWithQuizzes';
import WatchIdea from './WatchIdea';
import AddQuiz from './AddQuiz';

const PurposeAndVotes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/purposes" component={PageWithQuizzes} />
      <Route exact path="/purposes/add" component={AddQuiz} />
      <Route path="/purposes/:id" component={WatchIdea} />
    </Switch>
  );
};

export default PurposeAndVotes;
