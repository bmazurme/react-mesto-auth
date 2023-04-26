import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../../base-query';

const baseQuery = getBaseQuery('https://mesto.nomoreparties.co/v1/cohort36');

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Users'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default usersApi;
