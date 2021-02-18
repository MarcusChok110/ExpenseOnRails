import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { API_ROUTES } from '../../constants/index';
import fetchOptions from '../../utils/fetchOptions';
import { RootState } from '../store';

export const userInitial: User = {
  loggedIn: false,
  email: '',
  account: '',
  _id: '',
};

export const fetchUserByJWT = createAsyncThunk(
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
export const saveUserChanges = createAsyncThunk(
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
      const { user } = payload;

      state.loggedIn = true;
      state.email = payload.user.email;
      state.account = payload.user.account;
      state._id = payload.user._id;

      if (user.firstName) state.firstName = user.firstName;
      if (user.lastName) state.lastName = user.lastName;
    },
    [saveUserChanges.fulfilled.type]: (_state, { payload }) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error saving user changes');
      }
      return payload.user;
    },
  },
});

export const selectUser = (state: RootState) => state.user.present;
export default userSlice;
