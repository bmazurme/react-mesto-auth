/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { IPopupWithFormProps } from '../../interfaces/interfaces';

export default function PopupWithForm(props: IPopupWithFormProps) {
  const {
    name,
    isOpen,
    onClose,
    onSubmit,
    title,
    buttonText,
    children,
    isValid,
  } = props;

  const handleCloseClick = (evt: any) => {
    evt.currentTarget === evt.target && onClose();
  };

  return (
    <div
      onClick={handleCloseClick}
      className={`popup popup_type_${name} ${isOpen && 'popup_active'}`}
    >
      <div className="popup__container">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <form
          className={`form form_type_${name}`}
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button
            aria-label="Save"
            className={`button button_submit ${!isValid ? 'button_submit_inactive' : ''}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
