import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import { SIGNIN_URL, SIGNUP_URL, BASE_URL } from '../../utils/config';

function NavBar(props) {
  const {
    email,
    isOpen,
    handlerClick,
    onSignOut,
  } = props;

  return (
    <>
      <ul
        onClick={handlerClick}
        className={`navbar ${isOpen ? 'navbar_opened' : ''}`}
      >
        <Switch>
          <Route path={SIGNIN_URL}>
            <NavItem
              to={SIGNUP_URL}
              value="Регистрация"
              active="active"
            />
          </Route>
          <Route path={SIGNUP_URL}>
            <NavItem
              to={SIGNIN_URL}
              value="Войти"
              active="active"
            />
          </Route>
          <Route exact path={BASE_URL}>
            <NavItem
              to={BASE_URL}
              value={email}
              // onClick={() => console.log('go to profile')}
              active="active"
            />
            <NavItem
              to={SIGNIN_URL}
              value="Выйти"
              onClick={onSignOut}
            />
          </Route>
        </Switch>
      </ul>
      <button
        onClick={handlerClick}
        className={`navbar__btn ${isOpen ? 'navbar__btn_opened' : ''}`}
      />
    </>
  );
}

export default NavBar;
