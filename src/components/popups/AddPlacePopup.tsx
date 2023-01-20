/* eslint-disable max-len */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { IAddPlaceProps } from '../../interfaces/interfaces';
import { Button, Input } from '../form-components';

type FormPayload = {
  name: string;
  link: string;
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
    name: 'link',
    label: 'Link',
    pattern: {
      value: /^/,
      message: 'Link is invalid',
    },
    required: true,
    autoComplete: 'current-link',
  },
];

export default function AddPlacePopup(props: IAddPlaceProps) {
  const {
    isOpen,
    onClose,
    isLoading,
    onAddPlace,
  } = props;

  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '',
      link: '',
    },
  });

  const handleCloseClick = (evt: React.MouseEvent<HTMLElement>) => evt.currentTarget === evt.target && onClose();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onAddPlace(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div
      onClick={handleCloseClick}
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
          <h2 className="form__title">Новое место</h2>
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
                  black
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
