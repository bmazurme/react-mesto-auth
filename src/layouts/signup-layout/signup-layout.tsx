/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import useUser from '../../hooks/use-user';
import { useSignUpMutation } from '../../store';

import { Button, Input } from '../../components/form-components';
import FormFooter from '../../components/form-footer';
import InfoTooltip from '../../components/info-tooltip';

import { Urls } from '../../utils/constants';

import style from './signup-layout.module.css';

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

export default function SignupLayout() {
  const userData = useUser();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const errorHandler = useErrorHandler();
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleCloseAllPopups = () => setIsInfoToolTipPopupOpen(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result: unknown = await signUp(data as Omit<User, 'id' | 'display_name'>);
      setIsSuccess((result as Record<string, Record<string, string>>).error.code !== 'ERR_BAD_REQUEST');
      setIsInfoToolTipPopupOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <div className="identity">
      <h2 className={style.title}>Регистрация</h2>
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
      {isInfoToolTipPopupOpen ? (
        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={handleCloseAllPopups}
          isSuccess={isSuccess}
          text={
            isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
      ) : null}
    </div>
  );
}
