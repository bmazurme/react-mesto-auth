import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { IEditAvatarProps } from '../../interfaces/interfaces';
import { Button, Input } from '../form-components';

type FormPayload = {
  avatar: string;
};

const inputs = [
  {
    name: 'avatar',
    label: 'Avatar',
    pattern: {
      value: /^/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'current-avatar',
  },
];

export default function EditAvatarPopup(props: IEditAvatarProps) {
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
      avatar: '',
    },
  });

  const handleCloseClick = (evt: React.MouseEvent<HTMLElement>) => {
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
          <h2 className="form__title">Обновить аватар</h2>
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
