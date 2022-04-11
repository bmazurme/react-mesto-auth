import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return(
      <div className="identity">
        <h2 className="identity__title">Вход</h2>
        <form className="form form_identity" 
              onSubmit={handleSubmit}
              >
          <div className="form__box form__box_identity">
            <input placeholder="Email"
                    onChange={handleEmailChange} 
                    className="form__input form__input_identity form__input_type_name" 
                    name="email" 
                    type="email"
                    required
                    id="email-input"
                    autoComplete="off"
                    value={email || ''}
            />
          </div>

          <div className="form__box form__box_identity">
            <input  onChange={handlePasswordChange}
                    className="form__input form__input_identity form__input_type_email"
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    required
                    value={password || ''}
                    autoComplete="off"
            />
          </div>
          <button className="form__submit" 
                  type="submit">
            Войти
          </button>
        </form>
      </div>
  );
}

export default withRouter(Login) ;