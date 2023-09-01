/* eslint-disable no-undef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    setUsers: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload: data }: PayloadAction<User | null>,
    ) => ({ ...state, data: null }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchRejected,
        (state, action) => console.log('rejected', action),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUser.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUser.matchRejected,
        (state, action) => console.log('rejected', action),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUserAvatar.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUserAvatar.matchRejected,
        (state, action) => console.log('rejected', action),
      );
  },
});

export const { setUsers } = slice.actions;
export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
