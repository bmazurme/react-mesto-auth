/* eslint-disable */
import React, { forwardRef } from 'react';
import { type InputHTMLAttributes } from 'react';

type OwnProps = {
  id?: string;
  label?: string;
  errorText?: string;
};

export type InputProps = OwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    errorText = '',
    type,
    onChange,
    label,
    id,
    value,
    placeholder,
    className,
  } = props;
  return (
    <div className="text-field">
      {label && <label htmlFor={id} className={`text-field__label ${errorText ? 'input__label_error' : ''}`}>{label}</label>}
      <input
        ref={ref}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className={className}
      />
      {
        errorText
        && <span className={`${label}-input-error text-field__input-error text-field__input-error_help`}>{ errorText }</span>
      }
    </div>
  );
});

export default Input;
