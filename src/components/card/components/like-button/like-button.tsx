import React from 'react';
import classNames from 'classnames';
import { useErrorHandler } from 'react-error-boundary';

import { useChangeLikeMutation } from '../../../../store';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  authorized: User | null;
  card: Card;
}

export default function LikeButton({ user, card, authorized }: ILikeProps) {
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();
  const isLiked = card.likes.some((like: Like) => like?._id === user?._id);

  const onCardLike = async (c: Card) => {
    try {
      await changeLike({
        cardId: c._id,
        value: c.likes.some((u) => u._id === user?._id),
      });
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <button
      type="button"
      onClick={() => onCardLike(card)}
      aria-label="Like"
      className={classNames(
        style.like,
        { [style.checked]: isLiked },
        { [style.disabled]: !authorized },
      )}
      name="button-like"
      disabled={!authorized}
    />
  );
}
