import React from 'react';

interface IProps {
  isOpen: boolean,
  onClose: () => void,
  isSuccess: boolean,
  text: string,
}

function InfoTooltip(props: IProps) {
  const {
    text,
    isOpen,
    onClose,
    isSuccess,
  } = props;
  
  return (
    <div
      onClick={(e) => (e.currentTarget === e.target) && onClose()}
      className={`popup popup_tooltip ${isOpen ? 'popup_active' : ''}`}
    >
      <div className="popup__container">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <div className="tooltip">
          <div
            className={`tooltip__image ${isSuccess ? 'tooltip__image_success' : ''}`}
          >
          </div>
          <p className="tooltip__text">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
