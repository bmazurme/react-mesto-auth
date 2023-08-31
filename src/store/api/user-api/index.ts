import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../../base-query';

import { BASE_API_URL } from '../../../utils/constants';

const baseQuery = getBaseQuery(BASE_API_URL);

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Users'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default usersApi;
