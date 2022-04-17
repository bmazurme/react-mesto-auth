import React from 'react';

function Login(props) {
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
    props.onLogin(data.email, data.password);
  }

  return(
      <div className="identity">
        <h2 className="identity__title">Вход</h2>
        <form className="form form_identity" 
              onSubmit={handleSubmit}
              >
          <div className="form__box form__box_identity">
            <input placeholder="Email"
                    onChange={handleChange} 
                    className="form__input 
                               form__input_identity 
                               form__input_type_name" 
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
                    className="form__input 
                               form__input_identity 
                               form__input_type_email"
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    required
                    id="password-input"
                    value={data.password || ''}
                    autoComplete="off"
            />
            <span className="password-input-error 
                            form__input-error"></span>
          </div>
          <button className="button button_identity" 
                  type="submit">
            Войти
          </button>
        </form>
      </div>
  );
}

export default Login ;