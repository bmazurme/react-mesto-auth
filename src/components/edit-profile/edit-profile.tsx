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
    label: 'Имя',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
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

export default function EditProfile({ info, isLoading, onUpdateUser }
: { info: User | null; isLoading: boolean; onUpdateUser: (data: any) => void; }) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? {
      name: '',
      about: '',
    },
  });

  const onSubmit = handleSubmit(async (data: Record<string, string>) => {
    try {
      await onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
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
