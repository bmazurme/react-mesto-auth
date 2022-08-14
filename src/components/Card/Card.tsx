import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface IUser {
  _id: number
}

interface ILike {
  _id: number
}

interface ICard {
  _id: number,
  name: string,
  link: string,
  likes: Array<ILike>,
  owner: IUser,
  createdAt: Date
}

interface IProps {
  card: ICard,
  onCardDelete: (card: ICard) => void,
  onCardLike: (card: ICard) => void,
  onCardClick: (card: ICard) => void,
}

function Card(props: IProps) {
  const {
    card,
    onCardDelete,
    onCardLike,
    onCardClick,
  } = props;

  const { _id } = React.useContext(CurrentUserContext) as IUser;
  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some((like) => like._id === _id);
  const cardDeleteButtonClassName = (
    `card__remove ${isOwn ? 'card__remove_visible' : ''}`
  );
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_checked' : ''}`
  );
  
  return (
    <div className="card">
      <button
        onClick={() => onCardDelete(card)}
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
          <p className="card__counter">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
