/* eslint-disable */
import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { type InputHTMLAttributes } from 'react';

import style from './input-field.module.css';

type OwnProps = {
  id?: string;
  label?: string;
  black?: boolean;
  errorText?: string;
};

export type InputProps = OwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    errorText = '', type, onChange, label, id, value, placeholder, className, black,
  } = props;
  return (
    <div className={style['text-field']}>
      {label
        && <label
          htmlFor={id}
          className={classNames(
            style['text-field__label'],
            { [style['text-field__label_error']]: errorText },
            { [style['text-field__label_black']]: black },
          )}
        >
          {label}
        </label>}
      <input
        ref={ref}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(style['text-field__input'], className)}
      />
      {errorText
        && <span
            className={classNames(
              style['text-field__input-error'],
              style['text-field__input-error_help'],
              `${label}-input-error`)}
            >
              {errorText}
            </span>}
    </div>);
});

export default InputField;