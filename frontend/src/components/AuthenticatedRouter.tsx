import React, { FunctionComponent, ReactChild, ReactChildren } from 'react';

import { isAuthenticated } from '../data/auth';

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
      render={({ location }) => {
        if (isAuthenticated()) {
          return children;
        }
        const authPages = ['/login', '/register', '/resetPass'];
        if (!authPages.includes(location.pathname)) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }
        return <div />;
      }}
    />
  );
};

export default AuthenticatedRouter;
