import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/Api';

import { IUser } from '../../interfaces/IUser';

const initialState: { user: IUser|{}, status: string } = {
  user: {},
  status: 'idle',
};

export const getUserAsync = createAsyncThunk(
  'async',
  async () => {
    const response = await api.getUser();
    return response;
  }
);

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
})

export const { setUserData } = userSlice.actions;
export const selectData = (state: { currentUser: any; }) => state.currentUser;

export default userSlice.reducer;
