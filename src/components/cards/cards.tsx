import React from 'react';

import Card from '../card';

import { useAppSelector } from '../../hooks';
import { cardsSelector } from '../../store';

import style from './cards.module.css';

export default function Cards() {
  const cards = useAppSelector(cardsSelector);

  return (
    <section className={style.cards}>
      {cards.map((card: Card) => (
        <Card key={card._id} card={card} />
      ))}
    </section>
  );
}
