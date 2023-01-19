import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <img className="logo" src={logo} alt="Logo Mesto" />
    </Link>
  );
}
