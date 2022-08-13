import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavBar from '../NavBar/NavBar';

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handlerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`header 
      ${isOpen ? 'header_opened' : ''}`}
    >
      <Link to="/" className="logo" src={logo} alt="Логотип Место" />
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
