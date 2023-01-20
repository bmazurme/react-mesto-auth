import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Card from '../Card';
import { ImagePopup } from '../popups';

import { useChangeLikeMutation } from '../../store';

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
    <section className="cards">
      {cards.map((card: Card) => (
        <Card
          key={card._id}
          user={user}
          card={card}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
      ))}
      { selectedCard ? (<ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />) : null}
    </section>
  );
}
