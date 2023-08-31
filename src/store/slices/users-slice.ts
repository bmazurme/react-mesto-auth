/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

import { usersApiEndpoints } from '../api/user-api/endpoints';
import type { RootState } from '..';

export type InfoState = {
  data: User | null,
};

export const initialStateUsers: InfoState = {
  data: null,
};

const slice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchRejected,
        (state, action) => console.log('rejected', action),
      );
  },
});

export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
