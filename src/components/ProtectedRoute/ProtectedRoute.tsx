import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Urls } from '../../utils/constants';

import { IProtectedRouteProps } from '../../interfaces/interfaces';

function ProtectedRoute({ component: Component, ...props }: IProtectedRouteProps) {
  return (
    <Route>
      {
        () => props.isLoggedIn
          /* eslint-disable react/jsx-props-no-spreading */
          ? <Component {...props} />
          : <Redirect to={Urls.SIGNIN} />
      }
    </Route>
  );
}

export default ProtectedRoute;
