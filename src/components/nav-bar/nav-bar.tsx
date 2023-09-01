/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import Button from './components/button';
import NavItem from './components/nav-item';

import useUser from '../../hooks/use-user';
import { useAppDispatch } from '../../hooks';
import { setUser, setUsers } from '../../store';

import ThemeContext from '../../context/theme-context';

import { Urls } from '../../utils/constants';

import style from './navbar.module.css';

export default function NavBar({ isOpen, handlerClick }
  : { isOpen: boolean, handlerClick: () => void }) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const user = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    dispatch(setUser(null));
    dispatch(setUsers(null));
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
        {(!user && (pathname === Urls.SIGNIN || pathname === Urls.BASE)) && <NavItem to={Urls.SIGNUP} value="Sign up" active="active" />}
        {(!user && (pathname === Urls.SIGNUP || pathname === Urls.BASE)) && <NavItem to={Urls.SIGNIN} value="Sign in" active="active" />}
        {user?.email && <NavItem to="/" value={email} active="active" />}
        {user?.email && <NavItem to={Urls.SIGNIN} value="Sign Out" onClick={onSignOut} active="" />}
      </ul>
      <Button isOpen={isOpen} handlerClick={handlerClick} />
    </>
  );
}
