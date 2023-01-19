import React, { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { useSignInMutation } from '../../store';
import FormFooter from '../../components/FormFooter';
import { Button, Input } from '../../components/form-components';
import { Urls } from '../../utils/constants';
import useUser from '../../hook/useUser';

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

export default function SignIn() {
  const navigate = useNavigate();
  const userData = useUser();
  const errorHandler = useErrorHandler();
  const [signIn] = useSignInMutation();

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
      await signIn(data);
      navigate('/');
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div className="identity">
      <h2 className="identity__title">Вход</h2>
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
          <span>Войти</span>
        </Button>
        <FormFooter url={Urls.SIGNUP} label="Зарегистрироваться" />
      </form>
    </div>
  );
}
