import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import { EditProfilePopup, EditAvatarPopup, AddPlacePopup } from '../popups';
import { useUpdateUserMutation, useUpdateUserAvatarMutation, useAddCardMutation } from '../../store';

export default function Main({ info }:{ info: User | null }) {
  const errorHandler = useErrorHandler();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();
  const [updateUserAvatar, { isLoading: isLoadingAvatar }] = useUpdateUserAvatarMutation();
  const [addCard, { isLoading: isLoadingCard }] = useAddCardMutation();
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

  console.log(isLoadingAvatar);
  const handleUpdateUserSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  const handleUpdateAvatarSubmit = async (data: Record<string, string>) => {
    try {
      await updateUserAvatar(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  const handleAddPlaceSubmit = async (data: Record<string, string>) => {
    try {
      await addCard(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <section className="profile">
      <div
        className="profile__image"
        style={{ backgroundImage: `url(${info?.avatar})` }}
        onClick={handleOpenEditAvatarPopup}
        aria-hidden="true"
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
          isLoading={isLoadingAvatar}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateAvatarSubmit}
        />
      )
        : null}
      {isEditProfilePopupOpen ? (
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          info={info}
          isLoading={isLoadingUser}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUserSubmit}
        />
      )
        : null}
      {isAddPlacePopupOpen ? (
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoadingCard}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      )
        : null}
    </section>
  );
}
