import React from 'react';

import NavItem from '../NavItem';

export default function SignIn({ help, url, label }: Record<string, string>) {
  return (
    <div className="form__help">
      {help}
      <NavItem
        to={url}
        className="form__link"
        active="true"
        value={label}
      />
    </div>
  );
}
