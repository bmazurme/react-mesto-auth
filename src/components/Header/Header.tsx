import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import { IHeaderProps } from 'interfaces/interfaces';

import logo from '../../images/logo.svg';

function Header(props: IHeaderProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handlerClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={`header ${isOpen ? 'header_opened' : ''}`} >
      <Link className="logo" to="/">
        <img className="logo" src={logo} alt="Logo Mesto"></img>
      </Link>
      <NavBar
        /* eslint-disable react/jsx-props-no-spreading */
        {...props}
        handlerClick={handlerClick}
        isOpen={isOpen}
      />
    </header>
  );
}

export default Header;
