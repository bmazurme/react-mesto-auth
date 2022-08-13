import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm(props) {
  const {
    card,
    title,
    buttonText,
    isLoading,
    onSubmit,
    isOpen,
    onClose,
  } = props;

  const handleSubmit = (evt) => {
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

export default PopupWithConfirm;
