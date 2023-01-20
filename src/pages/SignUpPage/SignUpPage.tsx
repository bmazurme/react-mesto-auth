import React from 'react';
import SignUp from './SignUp';
import Content from '../../components/Content';
import withUser from '../../hoc/withUser';

function SignUpPage() {
  return (<Content children={(<SignUp />)} />);
}

export default withUser(SignUpPage, false);
