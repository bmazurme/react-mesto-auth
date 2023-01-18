/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { useDeleteCardMutation } from '../../store';
import { PopupWithConfirm } from '../popups';
import { ICardProps } from '../../interfaces/interfaces';

export default function Card(props: ICardProps) {
  const {
    user,
    card,
    onCardLike,
    onCardClick,
  } = props;

  const [deleteCard] = useDeleteCardMutation();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const isOwn = card?.owner?._id === user?._id;
  const isLiked = card.likes.some((like) => like?._id === user?._id);
  const cardDeleteButtonClassName = (`card__remove${isOwn ? ' card__remove_visible' : ''}`);
  const cardLikeButtonClassName = (`card__like${isLiked ? ' card__like_checked' : ''}`);
  const handleCloseAllPopups = () => setConfirmPopup(false);
  const handleCardDelete = async () => {
    try {
      await deleteCard(card);
      handleCloseAllPopups();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card">
      <button
        onClick={() => setConfirmPopup(true)}
        aria-label="Remove"
        className={cardDeleteButtonClassName}
        type="button"
      />
      <img
        className="card__image"
        alt={card.name}
        onClick={() => onCardClick(card)}
        src={card.link}
      />
      <div className="card__group">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__column">
          <button
            onClick={() => onCardLike(card)}
            aria-label="Like"
            className={cardLikeButtonClassName}
            name="button-like"
          />
          <p className="card__counter">{card.likes.length}</p>
        </div>
      </div>
      {confirmPopup ? (
        <PopupWithConfirm
          onSubmit={handleCardDelete}
          isOpen={confirmPopup}
          onClose={handleCloseAllPopups}
          title="Вы уверены?"
          buttonText="Удалить"
          card={null}
        />
      ) : null}
    </div>
  );
}
