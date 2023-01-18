/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { useState } from 'react';

import Card from '../Card';
import { ImagePopup } from '../popups';
import { useGetCardsQuery, useChangeLikeMutation } from '../../store';
import { ICard } from '../../interfaces/ICard';

export default function Cards({ user }: { user: User | null }) {
  // @ts-ignore
  const { data = [], error, isLoading } = useGetCardsQuery();
  const [changeLike] = useChangeLikeMutation();
  const [selectedCard, setSelectedCard] = useState<ICard|null>(null);
  const handleCardClick = (card: ICard) => setSelectedCard(card);
  const handleCloseAllPopups = () => setSelectedCard(null);

  const handleCardLike = async (card: ICard) => {
    try {
      await changeLike({ cardId: card._id, value: card.likes.some((u) => u._id === user?._id) });
      handleCloseAllPopups();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="cards">
      {data.map((card: ICard) => (
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
