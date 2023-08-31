import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import MainLayout from '../../layouts/main-layout';
import Content from '../../components/content';
import Preloader from '../../components/preloader';

import withUser from '../../hocs/with-user';
import { useGetCardsQuery, useGetUserMeQuery } from '../../store';

function MainPage() {
  const handleError = useErrorHandler();
  const { error: cardsError, isLoading: isLoadingCards } = useGetCardsQuery();
  const { error: userError, isLoading: isLoadingUser } = useGetUserMeQuery();

  if (cardsError) {
    handleError(cardsError);
  }

  if (userError) {
    handleError(userError);
  }

  return (
    <Content>
      {isLoadingCards || isLoadingUser ? <Preloader /> : <MainLayout />}
    </Content>
  );
}

export default withUser(MainPage, true);
