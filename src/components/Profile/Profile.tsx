/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { EditProfilePopup, EditAvatarPopup, AddPlacePopup } from '../popups';
import { useUpdateUserMutation, useUpdateUserAvatarMutation, useAddCardMutation } from '../../store';

export default function Main({ info }:{ info: User | null }) {
  const [updateUser] = useUpdateUserMutation();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const [addCard] = useAddCardMutation();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const handleOpenEditProfilePopup = () => setIsEditProfilePopupOpen(true);
  const handleOpenEditAvatarPopup = () => setIsEditAvatarPopupOpen(true);
  const handleOpenAddPlacePopup = () => setAddPlacePopupOpen(true);
  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
  };

  const handleUpdateUserSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(data);
      handleCloseAllPopups();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateAvatarSubmit = async (data: Record<string, string>) => {
    try {
      await updateUserAvatar(data);
      handleCloseAllPopups();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddPlaceSubmit = async (data: Record<string, string>) => {
    try {
      await addCard(data);
      handleCloseAllPopups();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="profile">
      <div
        className="profile__image"
        style={{ backgroundImage: `url(${info?.avatar})` }}
        onClick={handleOpenEditAvatarPopup}
      />
      <div className="profile__info">
        <h1 className="profile__name">{info?.name}</h1>
        <p className="profile__profession">{info?.about}</p>
        <button
          aria-label="Edit"
          type="button"
          className="profile__edit"
          onClick={handleOpenEditProfilePopup}
        />
      </div>
      <button
        aria-label="Add"
        className="profile__add"
        type="button"
        onClick={handleOpenAddPlacePopup}
      />
      {isEditAvatarPopupOpen ? (
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          info={info}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateAvatarSubmit}
        />
      )
        : null}
      {isEditProfilePopupOpen ? (
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          info={info}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUserSubmit}
        />
      )
        : null}
      {isAddPlacePopupOpen ? (
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      )
        : null}
    </section>
  );
}
