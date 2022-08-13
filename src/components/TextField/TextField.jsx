import React from 'react';

function TextField(props) {
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
            minLength={minLength || ''}
            maxLength={maxLength || ''}
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
          minLength={minLength || ''}
          maxLength={maxLength || ''}
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
