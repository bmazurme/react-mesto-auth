import React from 'react';
import { Link } from 'react-router-dom';

export interface INavItemProps {
  to: string,
  className?: string,
  onClick?: () => void,
  active: string,
  value: string,
}

export default function NavItem(props: INavItemProps) {
  const {
    to,
    onClick,
    active,
    value,
  } = props;
  const navClass = (act: string) => `navbar__link${act ? ' navbar__link_active' : ''}`;

  return (
    <li className="navbar__item">
      <Link to={to} onClick={onClick} className={navClass(active)}>
        {value}
      </Link>
    </li>
  );
}
