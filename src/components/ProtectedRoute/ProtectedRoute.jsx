import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { config, SIGNIN_URL } from '../../utils/config';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {
        () => props.isLoggedIn
          /* eslint-disable react/jsx-props-no-spreading */
          ? <Component {...props} />
          : <Redirect to={`/${config.ROOT_URL}${SIGNIN_URL}`} />
      }
    </Route>
  );
}

export default ProtectedRoute;
