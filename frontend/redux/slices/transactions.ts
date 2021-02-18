import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_ROUTES } from '../../constants';
import fetchOptions from '../../utils/fetchOptions';
import { RootState } from '../store';
import { Transaction } from '../types';

export const transactionsInitial: Transaction[] = [];

export const fetchTransactions = createAsyncThunk(
  'account/fetchTransactionStatus',
  async ({ jwt }: { jwt: string }) => {
    const options = fetchOptions.createGet(jwt);
    const response = await fetch(`${API_ROUTES.TRANSACTIONS}`, options);
    return await response.json();
  }
);

export const saveTransactions = createAsyncThunk(
  'account/saveTransactionStatus',
  async ({ jwt, state }: { jwt: string; state: Transaction[] }) => {
    const newTransactions: Transaction[] = [];

    for (const transaction of state) {
      const newTransaction: Transaction = { ...transaction };
      if (newTransaction.new) {
        // make POST request to save new transaction
        delete newTransaction.new;

        const options = fetchOptions.createPost(jwt, { newTransaction });
        const response = await fetch(`${API_ROUTES.TRANSACTIONS}`, options);
        const json = await response.json();

        if (!json.success) return json;

        newTransaction._id = json.transaction; // update id returned after saving
        newTransactions.push(newTransaction);
      } else {
        // make PUT request to save existing transaction
        const options = fetchOptions.createPut(jwt, { newTransaction });
        const response = await fetch(
          `${API_ROUTES.TRANSACTIONS}/${newTransaction._id}`,
          options
        );
        const json = await response.json();

        if (!json.success) return json;

        newTransactions.push(newTransaction);
      }
    }
    return { success: true, transactions: newTransactions }; // return new state if no errors have occurred
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: transactionsInitial,
  reducers: {
    add: (state, { payload }: PayloadAction<Transaction>) => {
      state.push(payload);
    },
    edit: (state, { payload }: PayloadAction<Transaction>) => {
      return state.map((transaction) => {
        return transaction._id === payload._id ? payload : transaction;
      });
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      return state.filter((transaction) => transaction._id !== payload);
    },
  },
  extraReducers: {
    [fetchTransactions.fulfilled.type]: (
      _state,
      {
        payload,
      }: PayloadAction<{ success: boolean; transactions: Transaction[] }>
    ) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error fetching transactions');
      }
      return payload.transactions;
    },
    [saveTransactions.fulfilled.type]: (
      _state,
      {
        payload,
      }: PayloadAction<
        | { success: true; transactions: Transaction[] }
        | { success: false; message: string; error: any }
      >
    ) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error saving transactions');
      }
      return payload.transactions;
    },
  },
});

export const selectTransactions = (state: RootState) => {
  return state.transactions.present;
};
export default transactionsSlice;
