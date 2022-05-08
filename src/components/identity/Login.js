import React from 'react';
import TextField from '../TextField';

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
    props.onLogin(data);
  }

  return(
    <div className="identity">
      <h2 className="identity__title">Вход</h2>
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
          className="button button_identity button_submit" 
          type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login ;