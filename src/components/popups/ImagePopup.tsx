import React from 'react';

import { IImageProps } from '../../interfaces/interfaces';

function ImagePopup(props: IImageProps) {
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
          onClick={onClose} />
        <div className="slide">
          <img
            src={card ? card.link : ''}
            alt={card ? card.name : ''}
            className="slide__image"
          />
          <p className="slide__name">
            {card ? card.name : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
