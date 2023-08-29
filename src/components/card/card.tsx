import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Popup from '../modal';
import WithConfirm from '../with-confirm';

import { useDeleteCardMutation } from '../../store';

import style from './card.module.css';

export interface ICardProps {
  user: User | null;
  card: Card,
  onCardLike: (card: Card) => void,
  onCardClick: (card: Card) => void,
}

export default function Card(props: ICardProps) {
  const {
    user, card, onCardLike, onCardClick,
  } = props;

  const errorHandler = useErrorHandler();
  const [deleteCard, { isLoading: isLoadingCard }] = useDeleteCardMutation();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const isOwn = card?.owner?._id === user?._id;
  const isLiked = card.likes.some((like: Like) => like?._id === user?._id);

  const cardDeleteButtonClassName = (`${style.remove}${isOwn ? ` ${style.remove_visible}` : ''}`);
  const cardLikeButtonClassName = (`${style.like}${isLiked ? ` ${style.like_checked}` : ''}`);

  const handleCloseAllPopups = () => setConfirmPopup(false);
  const handleCardDelete = async () => {
    try {
      await deleteCard(card);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <div className={style.card}>
      <button
        onClick={() => setConfirmPopup(true)}
        aria-label="Remove"
        className={cardDeleteButtonClassName}
        type="button"
      />
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
          <button
            type="button"
            onClick={() => onCardLike(card)}
            aria-label="Like"
            className={cardLikeButtonClassName}
            name="button-like"
          />
          <p className={style.counter}>{card.likes.length}</p>
        </div>
      </div>
      {confirmPopup &&
        <Popup
          onClose={handleCloseAllPopups}
          children={
            <WithConfirm
              card={card}
              isLoading={isLoadingCard}
              title="Вы уверены?"
              buttonText={isLoadingCard ? 'Удаляется...' : 'Удалить'}
              onSubmit={handleCardDelete}
            />}
        />
      }
    </div>
  );
}
