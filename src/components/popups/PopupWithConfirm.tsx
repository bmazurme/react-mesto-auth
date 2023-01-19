import React from 'react';
import PopupWithForm from './PopupWithForm';

import { IPopupWithConfirmProps } from '../../interfaces/interfaces';

export default function PopupWithConfirm(props: IPopupWithConfirmProps) {
  const {
    card,
    title,
    buttonText,
    isLoading,
    onSubmit,
    isOpen,
    onClose,
  } = props;

  const handleSubmit = (evt: Event) => {
    evt.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      name="confirm"
      isValid={true}
      title={title}
      buttonText={isLoading ? 'Удаление...' : buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
