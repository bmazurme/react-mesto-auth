import React, { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Profile from '../../components/profile';
import Cards from '../../components/cards';
import Preloader from '../../components/preloader';
import useUser from '../../hooks/use-user';

import { useGetCardsQuery, useGetUserMeMutation } from '../../store';

export default function MainLayout() {
  const data = useUser();
  const handleError = useErrorHandler();
  const { isError: cardsError, isLoading: isLoadingCards } = useGetCardsQuery();
  const [getUserMe, { data: user, isLoading, isError }] = useGetUserMeMutation();

  if (cardsError) {
    handleError(cardsError);
  }

  if (isError) {
    handleError(isError);
  }

  useEffect(() => {
    getUserMe();
  }, []);

  return (
    <>
      {(data && user && !isLoading) && <Profile />}
      {isLoadingCards ? <Preloader /> : <Cards />}
    </>
  );
}
