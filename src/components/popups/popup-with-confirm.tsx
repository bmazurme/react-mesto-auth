import React, { MouseEvent } from 'react';

import { IPopupWithConfirmProps } from '../../interfaces';

export default function PopupWithConfirm(props: IPopupWithConfirmProps) {
  const {
    card,
    title,
    buttonText,
    onSubmit,
    isOpen,
    onClose,
  } = props;

  const handleClose = (e: MouseEvent<HTMLElement>) => e.currentTarget === e.target && onClose();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <div
      onClick={handleClose}
      className={`popup popup_type_confirm ${isOpen && 'popup_active'}`}
      aria-hidden="true"
    >
      <div className="popup__container">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <form
          className="form form_type_confirm"
          name="confirm-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <h2 className="form__title">{title}</h2>
          <button aria-label="Save" className="button button_submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
