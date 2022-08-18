import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/interfaces';

const initialState: { user: IUser|{} } = {
  user: {},
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const { setUserData } = userSlice.actions;
export const selectData = (state: { currentUser: any; }) => state.currentUser;

export default userSlice.reducer;
