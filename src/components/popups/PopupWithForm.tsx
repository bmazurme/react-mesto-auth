import React from 'react';

interface IProps {
  name: string,
  isOpen: boolean,
  onClose: () => {},
  onSubmit: any,
  title: string,
  children: any,
  buttonText: string,
  isValid: boolean,
}

function PopupWithForm(props: IProps) {
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

  const handleCloseClick = (e: any) => {
    e.currentTarget === e.target && onClose();
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

export default PopupWithForm;
