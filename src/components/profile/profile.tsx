import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

import Popup from '../modal';
import EditProfile from '../edit-profile';
import EditAvatar from '../edit-avatar';
import AddPlace from '../add-place';
import { useUpdateUserMutation, useUpdateUserAvatarMutation, useAddCardMutation } from '../../store';

import style from './profile.module.css';

export default function Main({ info }: { info: User | null }) {
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
    <section className={style.profile}>
      <div
        className={style.image}
        style={{ backgroundImage: `url(${info?.avatar})` }}
        onClick={handleOpenEditAvatarPopup}
        aria-hidden="true"
      />
      <div className={style.info}>
        <h1 className={style.name}>{info?.name}</h1>
        <p className={style.profession}>{info?.about}</p>
        <button
          aria-label="Edit"
          type="button"
          className={style.edit}
          onClick={handleOpenEditProfilePopup}
        >
          <PencilIcon className="h-2 w-2" />
        </button>
      </div>
      <button
        aria-label="Add"
        className={style.add}
        type="button"
        onClick={handleOpenAddPlacePopup}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {isEditAvatarPopupOpen
        && (
        <Popup
          onClose={handleCloseAllPopups}
          children={(
            <EditAvatar
              isLoading={isLoadingAvatar}
              info={info}
              onUpdateUser={handleUpdateAvatarSubmit}
            />
          )}
        />
        )}
      {isEditProfilePopupOpen
        && (
        <Popup
          onClose={handleCloseAllPopups}
          children={(
            <EditProfile
              isLoading={isLoadingUser}
              info={info}
              onUpdateUser={handleUpdateUserSubmit}
            />
          )}
        />
        )}
      {isAddPlacePopupOpen
        && (
        <Popup
          onClose={handleCloseAllPopups}
          children={<AddPlace isLoading={isLoadingCard} onAddPlace={handleAddPlaceSubmit} />}
        />
        )}
    </section>
  );
}
