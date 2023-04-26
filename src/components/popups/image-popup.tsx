import React, { MouseEvent } from 'react';

export default function ImagePopup({ card, onClose }
: { onClose: () => void, card: Card | null }) {
  const handleClose = (e: MouseEvent<HTMLElement>) => e.currentTarget === e.target && onClose();

  return (
    <div
      onClick={handleClose}
      className={`popup popup_type_slide popup_image ${card && 'popup_active'}`}
      aria-hidden="true"
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
