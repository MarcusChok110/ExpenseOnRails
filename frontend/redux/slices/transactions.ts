import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_ROUTES } from '../../utils/constants';
import fetchOptions from '../../utils/fetchOptions';
import { RootState } from '../store';
import { Transaction } from '../types';

export const transactionsInitial: Transaction[] = [];

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactionStatus',
  async ({ jwt }: { jwt: string }) => {
    const options = fetchOptions.createGet(jwt);
    const response = await fetch(`${API_ROUTES.TRANSACTIONS}`, options);
    return await response.json();
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransactionStatus',
  async ({ jwt, transaction }: { jwt: string; transaction: Transaction }) => {
    const options = fetchOptions.createPost(jwt, transaction);
    const response = await fetch(`${API_ROUTES.TRANSACTIONS}`, options);
    return await response.json();
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransactionStatus',
  async ({ jwt, _id }: { jwt: string; _id: string }) => {
    const options = fetchOptions.createDelete(jwt);
    const response = await fetch(`${API_ROUTES.TRANSACTIONS}/${_id}`, options);
    return await response.json();
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransactionStatus',
  async ({ jwt, transaction }: { jwt: string; transaction: Transaction }) => {
    const options = fetchOptions.createPut(jwt, transaction);
    const response = await fetch(
      `${API_ROUTES.TRANSACTIONS}/${transaction._id}`,
      options
    );
    return await response.json();
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
    [createTransaction.fulfilled.type]: (
      state,
      {
        payload,
      }: PayloadAction<
        | { success: true; transaction: any }
        | { success: false; message: string; error: any }
      >
    ) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error creating Transaction');
      }
      const { _doc } = payload.transaction;
      return [...state, _doc];
    },
    [deleteTransaction.fulfilled.type]: (
      state,
      {
        payload,
      }: PayloadAction<
        | { success: true; message: string; _id: string }
        | { success: false; message: string; error: any }
      >
    ) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error deleting transaction');
      }
      return state.filter((element) => element._id !== payload._id);
    },
    [editTransaction.fulfilled.type]: (
      state,
      {
        payload,
      }: PayloadAction<
        | { success: true; transaction: Transaction }
        | { success: false; message: string; error: any }
      >
    ) => {
      if (!payload.success) {
        console.log(payload);
        throw new Error('Error deleting transaction');
      }
      return state.map((element) => {
        const { transaction } = payload;
        if (element._id === transaction._id) {
          return transaction;
        } else {
          return element;
        }
      });
    },
  },
});

export const transactionsActions = {
  ...transactionsSlice.actions,
  fetchTransactions,
  createTransaction,
  deleteTransaction,
  editTransaction,
};
export const selectTransactions = (state: RootState) => {
  return state.transactions.present;
};
export default transactionsSlice;
