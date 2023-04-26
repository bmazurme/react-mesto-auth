import React from 'react';
import SignIn from './signin';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function SignInPage() {
  return (<Content children={<SignIn />} />);
}

export default withUser(SignInPage, false);
