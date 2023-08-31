import React from 'react';
import classNames from 'classnames';
import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
  onCardLike: (card: Card) => void;
}

export default function LikeButton({ user, card, onCardLike }: ILikeProps) {
  const isLiked = card.likes.some((like: Like) => like?._id === user?._id);

  return (
    <button
      type="button"
      onClick={() => onCardLike(card)}
      aria-label="Like"
      className={classNames(style.like, { [style.checked]: isLiked })}
      name="button-like"
    />
  );
}
