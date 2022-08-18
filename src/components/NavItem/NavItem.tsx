import React from 'react';
import { Link } from 'react-router-dom';

import { INavItemProps } from 'interfaces/interfaces';

function NavItem(props: INavItemProps) {
  const {
    to,
    onClick,
    active,
    value,
  } = props;

  return (
    <li className="navbar__item">
      <Link
        to={to}
        onClick={onClick}
        className={`navbar__link ${active ? 'navbar__link_active' : ''}`}
      >
        {value}
      </Link>
    </li>
  );
}

export default NavItem;
