import React from 'react';
import TextField from '../TextField';

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
      <form 
        className="form form_identity" 
        onSubmit={handleSubmit}
      >
        <TextField
          styles="identity"
          placeholder="Email"
          label="email"
          handleChange={handleChange}
          name="email" 
          type="email"
          value={data.email}
        />
        <TextField
          styles="identity"
          placeholder="Пароль"
          label="password"
          handleChange={handleChange}
          name="password" 
          type="password"
          value={data.password}
        />
        <button 
          className="button button_identity" 
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