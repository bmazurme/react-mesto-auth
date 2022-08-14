import React from 'react';

interface IProps {
  label: string,
  pattern: string,
  name: string,
  placeholder: string,
  onChange: () => void,
  minLength: number,
  maxLength: number,
  required: boolean,
  errors: any,
  type: string,
  id: string,
  autoComplete: string,
  value: string,
  className: string,
}

function TextField(props: IProps) {
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
      <span className={`${label}-input-error text-field__input-error`}></span>
    </div>
  );
}

export default TextField;
