import React from 'react';
import SignIn from './SignIn';
import Content from '../../components/Content';
import withUser from '../../hoc/withUser';

function SignInPage() {
  return (<Content children={<SignIn />} />);
}

export default withUser(SignInPage, false);
