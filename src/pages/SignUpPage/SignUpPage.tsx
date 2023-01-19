import React from 'react';
import SignUp from './SignUp';
import Component from '../../components/Component';
import withUser from '../../hoc/withUser';

function SignUpPage() {
  return (<Component children={(<SignUp />)} />);
}

export default withUser(SignUpPage, false);
