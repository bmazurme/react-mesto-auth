import React from 'react';
import SignupLayout from '../../layouts/signup-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function SignUpPage() {
  return (<Content children={(<SignupLayout />)} />);
}

export default withUser(SignUpPage, false);
