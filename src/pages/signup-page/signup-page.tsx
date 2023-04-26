import React from 'react';
import SignUp from './signup';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function SignUpPage() {
  return (<Content children={(<SignUp />)} />);
}

export default withUser(SignUpPage, false);
