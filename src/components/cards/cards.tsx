import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Card from '../card';
import Popup from '../modal';
import Slide from '../slide';

import { useChangeLikeMutation } from '../../store';

import style from './cards.module.css';

export default function Cards({ user, cards }
  : { user: User | null, cards: Card[] }) {
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const handleCardClick = (card: Card) => setSelectedCard(card);
  const handleCloseAllPopups = () => setSelectedCard(null);

  const handleCardLike = async (card: Card) => {
    try {
      await changeLike({
        cardId: card._id,
        value: card.likes.some((u) => u._id === user?._id),
      });
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <section className={style.cards}>
      {cards.map((card: Card) => (
        <Card
          key={card._id}
          user={user}
          card={card}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
      ))}
      {selectedCard
        && (<Popup children={<Slide card={selectedCard} />} onClose={handleCloseAllPopups} />)}
    </section>
  );
}
