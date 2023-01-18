/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, Input } from '../form-components';

type FormPayload = {
  name: string;
  about: string;
};

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'current-name',
  },
  {
    name: 'about',
    label: 'About',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'About is invalid',
    },
    required: true,
    type: 'about',
    autoComplete: 'current-about',
  },
];

export default function EditProfilePopup(props: any) {
  const {
    info,
    isLoading,
    isOpen,
    onClose,
    onUpdateUser,
  } = props;

  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? {
      name: '',
      about: '',
    },
  });

  const handleCloseClick = (evt: any) => {
    evt.currentTarget === evt.target && onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div onClick={handleCloseClick} className={`popup popup_type_edit ${isOpen && 'popup_active'}`}>
      <div className="popup__container">
        <button
          aria-label="Close"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        <form className="form form_type_edit" onSubmit={onSubmit}>
          <h2 className="form__title">Редактировать профиль</h2>
          {inputs.map((input) => (
            <Controller
              key={input.name}
              name={input.name as keyof FormPayload}
              rules={{
                pattern: input.pattern,
                required: input.required,
              }}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  {...input}
                  className="text-field__input"
                  errorText={fieldState.error?.message}
                />
              )}
            />
          ))}
          <Button className="button button_submit" variant="filled">
            <span>{buttonText}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
