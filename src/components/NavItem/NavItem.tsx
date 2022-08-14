import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string,
  onClick: () => void,
  active: string,
  value: string,
}

function NavItem(props: IProps) {
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
