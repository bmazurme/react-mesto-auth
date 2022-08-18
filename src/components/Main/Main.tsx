import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { selectData } from '../user/userSlice';

import { IMainProps } from '../../interfaces/interfaces';

function Main(props: IMainProps) {
  const { user } = useSelector(selectData);
  const { avatar, about, name } = user;
  const {
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onEditAvatar,
    handleCardLike,
    handleCardDelete,
  } = props;
  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__image"
          style={{ backgroundImage: `url(${avatar})` }}
          onClick={onEditAvatar}
        >
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__profession">{about}</p>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit"
            onClick={onEditProfile}
          />
        </div>
        <button
          aria-label="Add"
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((card: any) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />)}
      </section>
    </main>
  );
}

export default Main;
