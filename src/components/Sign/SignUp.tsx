import React from 'react';
import TextField from '../TextField/TextField';
import { Regexp } from '../../utils/constants';
import { Urls } from '../../utils/constants';
import { useFormWithValidation } from '../../utils/Validator';

import { IValid, ISignUpProps } from '../../interfaces/interfaces';

function SignUp({ onRegister }: ISignUpProps) {
  const {
    values,
    errors,
    isValid,
    handleChange,
  }: IValid = useFormWithValidation();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onRegister(values);
  };

  return (
    <div className="identity">
      <h2 className="identity__title">Регистрация</h2>
      <form
        className="form form_identity"
        onSubmit={handleSubmit}
      >
        <TextField
          pattern={Regexp.EMAIL}
          placeholder="E-mail"
          className="text-field__input_identity"
          label="E-mail"
          name="email"
          type="text"
          id="email-input"
          autoComplete="off"
          onChange={handleChange}
          errors={errors}
          value={values.email || ''}
          required
          minLength={0}
          maxLength={100}
        />
        <TextField
          placeholder="Пароль"
          className="text-field__input_identity"
          label="password"
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
          Зарегистрироваться
        </button>
        <div className="form__help">
          Уже зарегистрированы?
          <a href={Urls.SIGNIN} className="form__link">Войти</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
