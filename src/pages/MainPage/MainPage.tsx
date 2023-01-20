import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Main from './Main';
import Content from '../../components/Content';
import Preloader from '../../components/Preloader';

import withUser from '../../hoc/withUser';
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
