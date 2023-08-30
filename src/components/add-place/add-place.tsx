import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { Button, Input } from '../form-components';

type FormPayload = {
  name: string;
  link: string;
};

const inputs = [
  {
    name: 'name',
    label: 'Название',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'current-name',
  },
  {
    name: 'link',
    label: 'Url картинки',
    pattern: {
      value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/,
      message: 'Url is invalid',
    },
    required: true,
    autoComplete: 'current-link',
  },
];

export default function AddPlace({ isLoading, onAddPlace }
: { isLoading: boolean; onAddPlace: (data: any) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', link: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onAddPlace(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
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
  );
}
