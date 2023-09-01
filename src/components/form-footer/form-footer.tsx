import React from 'react';

import NavItem from '../nav-bar/components/nav-item';

import style from './form-footer.module.css';

export default function FormFooter({ help, url, label }: Record<string, string>) {
  return (
    <div className={style.help}>
      {help}
      <NavItem
        to={url}
        className={style.link}
        active="true"
        value={label}
      />
    </div>
  );
}
