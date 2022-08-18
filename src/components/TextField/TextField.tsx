import React from 'react';

import { ITextFieldProps } from '../../interfaces/interfaces';

function TextField(props: ITextFieldProps) {
  const {
    label,
    pattern,
    name,
    placeholder,
    onChange,
    minLength,
    maxLength,
    required,
    errors = [],
    type,
    id,
    autoComplete,
    value,
    className,
  } = props;

  return (
    <div
      className="text-field"
    >
      {pattern
        ? <input
            pattern={pattern}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            minLength={minLength || undefined}
            maxLength={maxLength || undefined}
            required={required}
            className={`text-field__input ${className} ${errors[name] ? 'text-field__input-error' : ''}`}
            type={type}
            id={id}
            autoComplete={autoComplete}
            value={value}
          />
      : <input
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          minLength={minLength || undefined}
          maxLength={maxLength || undefined}
          required={required}
          className={`text-field__input ${className} ${errors[name] ? 'text-field__input-error' : ''}`}
          type={type}
          id={id}
          autoComplete={autoComplete}
          value={value}
        />
      }
      <span className={`${label}-input-error text-field__input-error text-field__input-error_help`}>
        {errors[name]}
      </span>
    </div>
  );
}

export default TextField;
