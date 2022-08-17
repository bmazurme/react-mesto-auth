import React from 'react';
import PopupWithForm from './PopupWithForm';

import { ICard } from '../../interfaces/ICard';

interface IProps {
  title: string,
  isLoading: boolean,
  buttonText: string,
  card: ICard|null,
  onSubmit: any,
  onClose: any,
  isOpen: boolean
}

function PopupWithConfirm(props: IProps) {
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
      children={undefined}
    />
  );
}

export default PopupWithConfirm;
