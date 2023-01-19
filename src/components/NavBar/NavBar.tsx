import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useUser from '../../hook/useUser';
import NavItem from '../NavItem';
import { Urls } from '../../utils/constants';
import { setCredentials } from '../../store';

export default function NavBar(props
: { isOpen: boolean, handlerClick: () => void }) {
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
        {user?.email ? <NavItem to="/" value={email} active="active" /> : null}
        {user?.email ? <NavItem to={Urls.SIGNIN} value="Выйти" onClick={onSignOut} active="" /> : null}
      </ul>
      <button onClick={handlerClick} className={`navbar__btn${isOpen ? ' navbar__btn_opened' : ''}`} />
    </>
  );
}
