import React from 'react';

import Profile from '../../components/Profile';
import Cards from '../../components/Cards';
import { useGetUserMeQuery } from '../../store';

export default function Main() {
  // @ts-ignore
  const { data } = useGetUserMeQuery();

  return (
    <>
      <Profile info={data} />
      <Cards user={data} />
    </>
  );
}
