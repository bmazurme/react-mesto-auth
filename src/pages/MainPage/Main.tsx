import React from 'react';

import Profile from '../../components/Profile';
import Cards from '../../components/Cards';

export default function Main({ cards, user }
  : { cards: Card[], user: User }) {
  return (
    <>
      <Profile info={user} />
      <Cards user={user} cards={cards} />
    </>
  );
}
