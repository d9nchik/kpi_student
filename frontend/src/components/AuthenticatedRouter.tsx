import React, { FunctionComponent, ReactChild, ReactChildren } from 'react';

import { isAuthenticated } from '../utilities/auth';

import { Redirect, Route } from 'react-router-dom';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const AuthenticatedRouter: FunctionComponent<AuxProps> = ({
  children,
  ...rest
}: AuxProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthenticatedRouter;
