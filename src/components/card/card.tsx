import React from 'react';

import LikeButton from './components/like-button';
import RemoveButton from './components/remove-button';

import style from './card.module.css';

interface ICardProps {
  user: User | null;
  card: Card;
  onCardLike: (card: Card) => void;
  onCardClick: (card: Card) => void;
}

export default function Card({
  user, card, onCardLike, onCardClick,
}: ICardProps) {
  return (
    <div className={style.card}>
      <RemoveButton card={card} user={user} />
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
          <LikeButton card={card} user={user} onCardLike={onCardLike} />
          <p className={style.counter}>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
