import React from 'react';

import style from './slide.module.css';

export default function Slide({ card }: { card: Card | null }) {
  return (
    <div className={style.slide}>
      <img src={card?.link ?? ''} alt={card?.name ?? ''} className={style.image} />
      <p className={style.name}>{card?.name ?? ''}</p>
    </div>
  );
}
