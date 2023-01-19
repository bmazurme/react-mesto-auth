import React from 'react';
import SignIn from './SignIn';
import Component from '../../components/Component';
import withUser from '../../hoc/withUser';

function SignInPage() {
  return (<Component children={<SignIn />} />);
}

export default withUser(SignInPage, false);
