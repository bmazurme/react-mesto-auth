import React, { useState } from 'react';

import Logo from '../logo';
import NavBar from '../nav-bar';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handlerClick = () => setIsOpen(!isOpen);
  const hedClass = (op: boolean) => `header${op ? ' header_opened' : ''}`;

  return (
    <header className={hedClass(isOpen)}>
      <Logo />
      <NavBar handlerClick={handlerClick} isOpen={isOpen} />
    </header>
  );
}
