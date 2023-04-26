import React from 'react';
import NotFound from './not-found';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function NotFoundPage() {
  return (<Content children={(<NotFound />)} />);
}

export default withUser(NotFoundPage, false);
