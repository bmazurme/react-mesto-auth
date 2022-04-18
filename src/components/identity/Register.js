import React from 'react';

function Register(props) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(data);
  }

  return(
      <div className="identity">
        <h2 className="identity__title">Регистрация</h2>
        <form className="form form_identity" 
              onSubmit={handleSubmit}
              >
          <div className="form__box form__box_identity">
            <input placeholder="Email"
                    onChange={handleChange} 
                    className="form__input form__input_identity 
                               form__input_type_email" 
                    name="email" 
                    type="email"
                    required
                    id="email-input"
                    autoComplete="off"
                    value={data.email || ''}
            />
            <span className="email-input-error 
                             form__input-error"></span>
          </div>

          <div className="form__box form__box_identity">
            <input  onChange={handleChange}
                    className="form__input form__input_identity 
                               form__input_type_password"
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    id="password-input"
                    required
                    value={data.password || ''}
                    autoComplete="off"
            />
            <span className="password-input-error 
                             form__input-error"></span>
          </div>
          <button className="button button_identity" 
                  type="submit">
            Зарегистрироваться
          </button>

          <div className="form__help">
            Уже зарегистрированы? 
            <a href="/sign-in" className="form__link">Войти</a> 
          </div>
        </form>

      </div>
  );
}

export default Register ;