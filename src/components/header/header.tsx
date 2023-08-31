import React, { useState } from 'react';
import classNames from 'classnames';

import Logo from '../logo';
import NavBar from '../nav-bar';

import style from './header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={classNames(style.header, { [style.opened]: isOpen })}>
      <Logo />
      <NavBar handlerClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </header>
  );
}
