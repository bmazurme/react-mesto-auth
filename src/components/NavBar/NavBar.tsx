/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useUser from '../../hook/useUser';
import NavItem from '../NavItem';
import { Urls } from '../../utils/constants';
import { setCredentials } from '../../store';
import { INavBarProps } from '../../interfaces/interfaces';

export default function NavBar(props: INavBarProps) {
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

  return (
    <>
      <ul onClick={handlerClick} className={`navbar${isOpen ? ' navbar_opened' : ''}`}>
        {location.pathname === Urls.SIGNIN ? <NavItem to={Urls.SIGNUP} value="Регистрация" active="active" /> : null}
        {location.pathname === Urls.SIGNUP ? <NavItem to={Urls.SIGNIN} value="Войти" active="active" /> : null}
        {user?.email ? <NavItem to={Urls.BASE} value={email} active="active" /> : null}
        {user?.email ? <NavItem to={Urls.SIGNIN} value="Выйти" onClick={onSignOut} active="" /> : null}
      </ul>
      <button onClick={handlerClick} className={`navbar__btn${isOpen ? ' navbar__btn_opened' : ''}`} />
    </>
  );
}
