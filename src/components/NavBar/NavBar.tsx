import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
        <Routes>
          <Route
            path={Urls.SIGNIN}
            element={(<NavItem
              className=""
              to={Urls.SIGNUP}
              value="Регистрация"
              onClick={() => console.log('go to up')}
              active="active"
            />)}
          />
          <Route
            path={Urls.SIGNUP}
            element={(
              <NavItem
                className=""
                to={Urls.SIGNIN}
                value="Войти"
                onClick={() => console.log('go to in')}
                active="active"
              />
            )}
          />
          <Route
            path={Urls.BASE}
            element={(
              <>
                <NavItem
                  className=""
                  to={Urls.BASE}
                  value={email}
                  onClick={() => console.log('go to profile')}
                  active="active"
                />
                <NavItem
                  className=""
                  to={Urls.SIGNIN}
                  value="Выйти"
                  onClick={onSignOut}
                  active={''}
                />
              </>
            )}
          />
        </Routes>
      </ul>
      <button
        onClick={handlerClick}
        className={`navbar__btn ${isOpen ? 'navbar__btn_opened' : ''}`}
      />
    </>
  );
}

export default NavBar;
