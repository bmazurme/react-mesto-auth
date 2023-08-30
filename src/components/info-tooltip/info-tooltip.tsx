import React, { MouseEvent } from 'react';

import { IInfoTooltipProps } from '../../interfaces';

export default function InfoTooltip(props: IInfoTooltipProps) {
  const {
    text, isOpen, onClose, isSuccess,
  } = props;

  const handleClose = (e: MouseEvent<HTMLElement>) => e.currentTarget === e.target && onClose();

  return (
    <div
      onClick={handleClose}
      className={`popup popup_tooltip ${isOpen ? 'popup_active' : ''}`}
      aria-hidden="true"
    >
      <div className="popup__container">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <div className="tooltip">
          <div className={`tooltip__image ${isSuccess ? 'tooltip__image_success' : ''}`} />
          <p className="tooltip__text">{text}</p>
        </div>
      </div>
    </div>
  );
}
