import React from 'react';
import TextField from '../TextField/TextField';
import { SIGNUP_URL, EMAIL_REGEXP } from '../../utils/config';
import { useFormWithValidation } from '../../utils/Validator';

interface IProps {
  onLogin: ({email, password}: Record<string, string>) => void,
}

interface IValid {
  values: Record<string, string>,
  errors: Record<string, string>,
  isValid: boolean,
  handleChange: any,
}

function SignIn({ onLogin }: IProps) {
  const {
    values,
    errors,
    isValid,
    handleChange,
  }: IValid = useFormWithValidation();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="identity">
      <h2 className="identity__title">Вход</h2>
      <form
        className="form form_identity"
        onSubmit={handleSubmit}
      >
        <TextField
          pattern={EMAIL_REGEXP}
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
          <a href={SIGNUP_URL} className="form__link">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
