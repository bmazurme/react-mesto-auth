import React from 'react';
import TextField from '../TextField/TextField';
import { useFormWithValidation } from '../../utils/Validator';

import { Regexp } from '../../utils/constants';
import { Urls } from '../../utils/constants';

import { IValid, ISignInProps } from '../../interfaces/interfaces';

function SignIn({ onLogin }: ISignInProps) {
  const {
    values,
    errors,
    isValid,
    handleChange,
  }: IValid = useFormWithValidation();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <div className="identity">
      <h2 className="identity__title">Вход</h2>
      <form
        className="form form_identity"
        onSubmit={handleSubmit}
      >
        <TextField
          pattern={Regexp.EMAIL}
          placeholder="E-mail"
          label="E-mail"
          name="email"
          type="text"
          id="email-input"
          autoComplete="off"
          className="text-field__input_identity"
          onChange={handleChange}
          errors={errors}
          value={values.email || ''}
          required
          minLength={0}
          maxLength={100}
        />
        <TextField
          placeholder="Пароль"
          label="password"
          className="text-field__input_identity"
          onChange={handleChange}
          name="password"
          type="password"
          value={values.password || ''}
          errors={errors}
          minLength={6}
          maxLength={100}
          pattern={''}
          required
          id="password-input"
          autoComplete="off"
        />
        <button
          className={`button button_identity button_submit ${!isValid ? 'button_submit_inactive' : ''}`}
          disabled={!isValid}
          type="submit"
        >
          Войти
        </button>
        <div className="form__help">
          <a href={Urls.SIGNUP} className="form__link">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
