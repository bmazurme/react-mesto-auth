import React from 'react';
import { Route } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import { Urls } from '../../utils/constants';

import { INavBarProps } from "interfaces/interfaces";

function NavBar(props: INavBarProps) {
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
        <Route path={Urls.SIGNIN}>
          <NavItem
            to={Urls.SIGNUP}
            value="Регистрация"
            onClick={() => console.log('go to up')}
            active="active"
          />
        </Route>
        <Route path={Urls.SIGNUP}>
          <NavItem
            to={Urls.SIGNIN}
            value="Войти"
            onClick={() => console.log('go to in')}
            active="active"
          />
        </Route>
        <Route exact path={Urls.BASE}>
          <NavItem
            to={Urls.BASE}
            value={email}
            onClick={() => console.log('go to profile')}
            active="active"
          />
          <NavItem
            to={Urls.SIGNIN}
            value="Выйти"
            onClick={onSignOut}
            active={''}
          />
        </Route>
      </ul>
      <button
        onClick={handlerClick}
        className={`navbar__btn ${isOpen ? 'navbar__btn_opened' : ''}`}
      />
    </>
  );
}

export default NavBar;
