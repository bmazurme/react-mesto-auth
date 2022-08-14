import React from 'react';
import TextField from '../TextField/TextField';
import { SIGNIN_URL, EMAIL_REGEXP } from '../../utils/config';
import { useFormWithValidation } from '../../utils/Validator';

interface IProps {
  onRegister: ({email, password}: Record<string, string>) => void,
}

interface IValid {
  values: Record<string, string>,
  errors: Record<string, string>,
  isValid: boolean,
  handleChange: any,
}

function SignUp({ onRegister }: IProps) {
  const {
    values,
    errors,
    isValid,
    handleChange,
  }: IValid = useFormWithValidation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="identity">
      <h2 className="identity__title">Регистрация</h2>
      <form
        className="form form_identity"
        onSubmit={handleSubmit}
      >
        <TextField
          pattern={EMAIL_REGEXP}
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
          <a href={SIGNIN_URL} className="form__link">Войти</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
