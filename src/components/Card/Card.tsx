import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import { useDeleteCardMutation } from '../../store';
import { PopupWithConfirm } from '../popups';

export interface ICardProps {
  user: User | null;
  card: Card,
  onCardLike: (card: Card) => void,
  onCardClick: (card: Card) => void,
}

export default function Card(props: ICardProps) {
  const {
    user,
    card,
    onCardLike,
    onCardClick,
  } = props;

  const errorHandler = useErrorHandler();
  const [deleteCard, { isLoading: isLoadingCard }] = useDeleteCardMutation();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const isOwn = card?.owner?._id === user?._id;
  const isLiked = card.likes.some((like: Like) => like?._id === user?._id);
  const cardDeleteButtonClassName = (`card__remove${isOwn ? ' card__remove_visible' : ''}`);
  const cardLikeButtonClassName = (`card__like${isLiked ? ' card__like_checked' : ''}`);
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
        src={card.link}
        onClick={() => onCardClick(card)}
        aria-hidden="true"
      />
      <div className="card__group">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__column">
          <button
            type="button"
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
          isLoading={isLoadingCard}
          onClose={handleCloseAllPopups}
          title="Вы уверены?"
          buttonText={isLoadingCard ? 'Удаляется...' : 'Удалить'}
          card={null}
        />
      ) : null}
    </div>
  );
}
