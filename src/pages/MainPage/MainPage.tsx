import React from 'react';

import Component from '../../components/Component';
import Main from './Main';

import withUser from '../../hoc/withUser';

function MainPage() {
  return (
    <Component children={(<Main />)} />
  );
}

export default withUser(MainPage, true);
