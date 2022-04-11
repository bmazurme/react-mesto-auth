import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register() {
  return(
      <div className="identity">
        <h2 className="identity__title">Регистрация</h2>
        <form className="form form_identity" 
              //onSubmit={handleSubmit}
              >
          <div className="form__box form__box_identity">
            <input placeholder="Email"
                    //onChange={handleNameChange} 
                    className="form__input form__input_identity form__input_type_name" 
                    name="email" 
                    type="email"
                    required
                    id="email-input"
                    autoComplete="off"
                    //value={name || ''}
            />
          </div>

          <div className="form__box form__box_identity">
            <input  //onChange={handlePasswordChange}
                    className="form__input form__input_identity form__input_type_email"
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    required
                    //value={password || ''}
                    autoComplete="off"
            />
          </div>
          <button className="form__submit" 
                  type="submit">
            Зарегистрироваться
          </button>

          <div className="form__help">
            Уже зарегистрированы? 
            <a href="/login" className="form__link">Войти</a> 
          </div>
        </form>

      </div>
  );
}

export default withRouter(Register) ;