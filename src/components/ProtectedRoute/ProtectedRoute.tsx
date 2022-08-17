import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN_URL } from '../../utils/config';

import { IProps } from './IProps';

function ProtectedRoute({ component: Component, ...props }: IProps) {
  return (
    <Route>
      {
        () => props.isLoggedIn
          /* eslint-disable react/jsx-props-no-spreading */
          ? <Component {...props} />
          : <Redirect to={SIGNIN_URL} />
      }
    </Route>
  );
}

export default ProtectedRoute;
