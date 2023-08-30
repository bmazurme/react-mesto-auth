/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import style from './button.module.css';

export default function Button({ isOpen, handlerClick }
  : { isOpen: boolean; handlerClick: () => void }) {
  return (
    <button
      type="button"
      onClick={handlerClick}
      className={`${style.btn}${isOpen ? ' navbar__btn_opened' : ''}`}
    />
  );
}
