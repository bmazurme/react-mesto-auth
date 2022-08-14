import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN_URL } from '../../utils/config';
import Main from '../Main/Main';
import Card from '../Card/Card';


interface IProps {
  exact: any,
  path: string,
  isLoggedIn: boolean,
  component: typeof Main,
  isLoading: boolean,
  cards: Array<typeof Card>,
  onEditAvatar: () => void,
  onEditProfile: () => void,
  onAddPlace: () => void,
  onCardClick: (card: any) => void,
  handleCardLike: (card: any) => void,
  handleCardDelete: (card: any) => void,
}

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
