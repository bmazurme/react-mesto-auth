/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import style from './button.module.css';

export default function Button({ isOpen, handlerClick }
  : { isOpen: boolean; handlerClick: () => void }) {
  return (
    <button
      type="button"
      onClick={handlerClick}
      className={classNames(style.btn, { [style.opened]: isOpen })}
    />
  );
}
