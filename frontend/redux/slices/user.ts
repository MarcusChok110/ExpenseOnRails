import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { API_ROUTES } from '../../utils/constants/index';
import fetchOptions from '../../utils/fetchOptions';
import { RootState } from '../store';

export const userInitial: User = {
  loggedIn: false,
  email: '',
  account: '',
  _id: '',
};

/**
 * Thunk to fetch user if jwt is already in local storage
 */
const fetchUserByJWT = createAsyncThunk(
  'user/fetchByJWTStatus',
  async (jwt: string) => {
    const options = fetchOptions.createGet(jwt);
    const response = await fetch(API_ROUTES.USERS, options);
    return await response.json();
  }
);

/**
 * Thunk to save user email, first name, or last name changes
 */
const saveUserChanges = createAsyncThunk(
  'user/saveUserStatus',
  async ({ jwt, _id, state }: { jwt: string; _id: string; state: User }) => {
    const update = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
    };
    const options = fetchOptions.createPut(jwt, { user: update });
    const response = await fetch(`${API_ROUTES.USERS}/${_id}`, options);
    return await response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {
    editFirstName: (state, { payload }: PayloadAction<string>) => {
      state.firstName = payload;
    },
    editLastName: (state, { payload }: PayloadAction<string>) => {
      state.lastName = payload;
    },
  },
  extraReducers: {
    [fetchUserByJWT.fulfilled.type]: (state, { payload }) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error fetching user');
      }

      return { ...state, ...payload.user, loggedIn: true };
    },
    [saveUserChanges.fulfilled.type]: (state, { payload }) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error saving user changes');
      }
      return { ...state, ...payload.user, loggedIn: true };
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  fetchUserByJWT,
  saveUserChanges,
};
export const selectUser = (state: RootState) => state.user.present;
export default userSlice;
