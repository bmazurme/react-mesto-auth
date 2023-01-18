/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { IImageProps } from '../../interfaces/interfaces';

export default function ImagePopup(props: IImageProps) {
  const { card, onClose } = props;

  const handleCloseClick = (e: any) => {
    e.currentTarget === e.target && onClose();
  };

  return (
    <div
      onClick={handleCloseClick}
      className={`popup popup_type_slide popup_image ${card && 'popup_active'}`}
    >
      <div className="popup__container popup__container_image">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <div className="slide">
          <img src={card?.link ?? ''} alt={card?.name ?? ''} className="slide__image" />
          <p className="slide__name">{card?.name ?? ''}</p>
        </div>
      </div>
    </div>
  );
}
