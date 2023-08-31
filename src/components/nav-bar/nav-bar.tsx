/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import Button from './components/button';
import NavItem from './components/nav-item';

import useUser from '../../hooks/use-user';
import { setCredentials } from '../../store';
import ThemeContext from '../../context/theme-context';

import { Urls } from '../../utils/constants';

import style from './navbar.module.css';

export default function NavBar(props: { isOpen: boolean, handlerClick: () => void }) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const user = useUser();
  const dispatch = useDispatch();
  const { isOpen, handlerClick } = props;

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);

  const onSignOut = async () => {
    localStorage.removeItem('jwt');
    await dispatch(setCredentials(null));
  };

  const onToggle = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('ms-theme', isDark === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <button className={style.icon} type="button" onClick={onToggle}>
        {isDark === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
      </button>
      <ul onClick={handlerClick} className={classNames(style.navbar, { [style.opened]: isOpen })} aria-hidden="true">
        {location.pathname === Urls.SIGNIN && <NavItem to={Urls.SIGNUP} value="Регистрация" active="active" />}
        {location.pathname === Urls.SIGNUP && <NavItem to={Urls.SIGNIN} value="Войти" active="active" />}
        {user?.email && <NavItem to="/" value={email} active="active" />}
        {user?.email && <NavItem to={Urls.SIGNIN} value="Выйти" onClick={onSignOut} active="" />}
      </ul>
      <Button isOpen={isOpen} handlerClick={handlerClick} />
    </>
  );
}
