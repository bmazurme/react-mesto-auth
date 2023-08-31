import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../../base-query';

import { BASE_API_URL } from '../../../utils/constants';

const baseQuery = getBaseQuery(BASE_API_URL);

const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery,
  tagTypes: ['Cards'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default cardsApi;
