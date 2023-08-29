import React, { useState } from 'react';

import Logo from '../logo';
import NavBar from '../nav-bar';

import style from './header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handlerClick = () => setIsOpen(!isOpen);
  const hedClass = (op: boolean) => `${style.header}${op ? ` ${style.opened}` : ''}`;

  return (
    <header className={hedClass(isOpen)}>
      <Logo />
      <NavBar handlerClick={handlerClick} isOpen={isOpen} />
    </header>
  );
}
