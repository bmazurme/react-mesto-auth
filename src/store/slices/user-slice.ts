/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { authApiEndpoints } from '..';

export type AuthState = {
  data: User | null
};

export const initialState: AuthState = {
  data: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload: data }: PayloadAction<User | null>,
    ) => ({ ...state, data: null }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiEndpoints.endpoints.getUser.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.data }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.getUser.matchRejected,
        (state, action) => {
          // @ts-ignore
          if (action.payload.message !== 'Unauthorized error') {
            console.log('rejected', action);
          }
        },
      );
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;
export const userSelector = (state: RootState) => state.user.data;
