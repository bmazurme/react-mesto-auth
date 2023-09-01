import React, { useState } from 'react';

import Modal from '../modal';
import Slide from '../slide';
import LikeButton from './components/like-button';
import RemoveButton from './components/remove-button';

import useUsers from '../../hooks/use-users';
import useUser from '../../hooks/use-user';

import style from './card.module.css';

export default function Card({ card }: { card: Card; }) {
  const user = useUsers();
  const authorized = useUser();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const handleCloseAllPopups = () => setSelectedCard(null);
  const onCardClick = (c: Card) => setSelectedCard(c);

  return (
    <div className={style.card}>
      {authorized && user && <RemoveButton card={card} user={user} />}
      <img
        className={style.image}
        alt={card.name}
        src={card.link}
        onClick={() => onCardClick(card)}
        aria-hidden="true"
        loading="lazy"
      />
      <div className={style.group}>
        <h2 className={style.name}>{card.name}</h2>
        <div className={style.column}>
          <LikeButton card={card} user={user} authorized={authorized} />
          <p className={style.counter}>{card.likes.length}</p>
        </div>
      </div>
      {selectedCard
        && (<Modal children={<Slide card={selectedCard} />} onClose={handleCloseAllPopups} />)}
    </div>
  );
}
