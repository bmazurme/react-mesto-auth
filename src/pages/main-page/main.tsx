import React from 'react';

import Profile from '../../components/profile';
import Cards from '../../components/cards';

export default function Main({ cards, user }
  : { cards: Card[], user: User }) {
  return (
    <>
      <Profile info={user} />
      <Cards user={user} cards={cards} />
    </>
  );
}
