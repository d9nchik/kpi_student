import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import PageWithQuizzes from './PageWithQuizzes';

const PurposeAndVotes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/purposes" component={PageWithQuizzes} />
    </Switch>
  );
};

export default PurposeAndVotes;
