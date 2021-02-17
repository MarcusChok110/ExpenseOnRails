import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_ROUTES } from '../../constants';
import fetchOptions from '../../utils/fetchOptions';
import { Account } from '../types';

export const accountInitial: Account = {
  categories: [],
  balance: 0,
  budget: 0,
  expenses: 0,
};

export const fetchAccountById = createAsyncThunk(
  'account/fetchAccountStatus',
  async ({ jwt, id }: { jwt: string; id: string }) => {
    const options = fetchOptions.createGet(jwt);
    const response = await fetch(`${API_ROUTES.ACCOUNTS}/${id}`, options);
    return await response.json();
  }
);

export const saveAccountChanges = createAsyncThunk(
  'account/saveAccountStatus',
  async ({ jwt, id, state }: { jwt: string; id: string; state: Account }) => {
    const options = fetchOptions.createPut(jwt, { account: state });
    const response = await fetch(`${API_ROUTES.ACCOUNTS}/${id}`, options);
    return await response.json();
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: accountInitial,
  reducers: {
    changeBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    changeBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    changeExpenses: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchAccountById.fulfilled.type]: (state, { payload }) => {
      if (!payload.success) return;
      const { account } = payload;

      if (account.categories) state.categories = account.categories;
      if (account.balance) state.balance = account.balance;
      if (account.budget) state.budget = account.budget;
      if (account.expenses) state.expenses = account.expenses;
    },
  },
});

export default accountSlice;
