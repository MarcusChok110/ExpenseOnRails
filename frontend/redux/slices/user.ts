import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { API_ROUTES } from '../../constants/index';
import fetchOptions from '../../utils/fetchOptions';

export const userInitial: User = {
  loggedIn: false,
  email: '',
  account: '',
};

const fetchUserByJWT = createAsyncThunk(
  'user/fetchByJWTStatus',
  async (jwt: string) => {
    const options = fetchOptions.createGet(jwt);
    const response = await fetch(API_ROUTES.USERS, options);
    return await response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {},
  extraReducers: {
    [fetchUserByJWT.fulfilled.type]: (state, { payload }) => {
      if (!payload.success) return;
      const { user } = payload;

      state.loggedIn = true;
      state.email = payload.user.email;
      state.account = payload.user.account;

      if (user.firstName) state.firstName = user.firstName;
      if (user.lastName) state.lastName = user.lastName;
    },
  },
});

export default userSlice;
