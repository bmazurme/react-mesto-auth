/* eslint-disable no-undef */
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';
import FormFooter from '../../components/FormFooter';
import { Button, Input } from '../../components/form-components';
import { useSignUpMutation } from '../../store';
import useUser from '../../hook/useUser';
import { Urls } from '../../utils/constants';

type FormPayload = {
  email: string;
  password: string;
};

const inputs = [
  {
    name: 'email',
    label: 'E-mail',
    pattern: {
      value: /[a-z0-9._%+-]+@[a-z0-9.-]+[.{0}][a-z]{2,3}$/,
      message: 'Email is invalid',
    },
    required: true,
    autoComplete: 'current-email',
  },
  {
    name: 'password',
    label: 'Password',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Password is invalid',
    },
    required: true,
    type: 'password',
    autoComplete: 'current-password',
  },
];

export default function SignUp() {
  const userData = useUser();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data as Omit<User, 'id' | 'display_name'>);
      navigate('/');
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div className="identity">
      <h2 className="identity__title">Регистрация</h2>
      <form className="form form_identity" onSubmit={onSubmit}>
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
                className="text-field__input text-field__input_identity"
                errorText={fieldState.error?.message}
              />
            )}
          />
        ))}
        <Button className="button button_identity button_submit" variant="filled">
          <span>Зарегистрироваться</span>
        </Button>
        <FormFooter url={Urls.SIGNIN} label="Войти" />
      </form>
    </div>
  );
}
