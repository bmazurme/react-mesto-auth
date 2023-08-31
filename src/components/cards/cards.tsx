import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Card from '../card';
import Modal from '../modal';
import Slide from '../slide';

import { useAppSelector } from '../../hooks';
import { cardsSelector, usersSelector, useChangeLikeMutation } from '../../store';

import style from './cards.module.css';

export default function Cards() {
  const user = useAppSelector(usersSelector);
  const errorHandler = useErrorHandler();
  const cards = useAppSelector(cardsSelector);
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
        && (<Modal children={<Slide card={selectedCard} />} onClose={handleCloseAllPopups} />)}
    </section>
  );
}
