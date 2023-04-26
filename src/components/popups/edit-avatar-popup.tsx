import React, { MouseEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { IEditProfileProps } from '../../interfaces';
import { Button, Input } from '../form-components';

type FormPayload = { avatar: string; };

const inputs = [
  {
    name: 'avatar',
    label: 'Url картинки',
    pattern: {
      value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/,
      message: 'Url is invalid',
    },
    required: true,
    autoComplete: 'current-avatar',
  },
];

export default function EditAvatarPopup(props: IEditProfileProps) {
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

  const handleClose = (e: MouseEvent<HTMLElement>) => e.currentTarget === e.target && onClose();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div
      onClick={handleClose}
      className={`popup popup_type_edit ${isOpen && 'popup_active'}`}
      aria-hidden="true"
    >
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
                  black
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
