import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

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

export default function EditAvatar({ info, isLoading, onUpdateUser }
: { info: User | null; isLoading: boolean; onUpdateUser: (data: any) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? {
      avatar: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
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
  );
}
