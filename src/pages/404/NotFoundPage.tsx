import React from 'react';
import NotFound from './NotFound';
import Content from '../../components/Content';
import withUser from '../../hoc/withUser';

function NotFoundPage() {
  return (<Content children={(<NotFound />)} />);
}

export default withUser(NotFoundPage, false);
