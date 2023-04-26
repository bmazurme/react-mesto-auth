import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Main from './main';
import Content from '../../components/content';
import Preloader from '../../components/preloader';

import withUser from '../../hocs/with-user';
import { useGetCardsQuery, useGetUserMeQuery } from '../../store';

function MainPage() {
  const handleError = useErrorHandler();
  // @ts-ignore
  const { data: cards = [], error: cardsError, isLoading: isLoadingCards } = useGetCardsQuery();
  // @ts-ignore
  const { data: user, error: userError, isLoading: isLoadingUser } = useGetUserMeQuery();

  if (cardsError) {
    handleError(cardsError);
  }

  if (userError) {
    handleError(userError);
  }

  return (
    <Content>
      {isLoadingCards || isLoadingUser ? <Preloader /> : <Main cards={cards} user={user} />}
    </Content>
  );
}

export default withUser(MainPage, true);
