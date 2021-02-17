import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../types';

export const transactionsInitial: Transaction[] = [];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: transactionsInitial,
  reducers: {},
});

export default transactionsSlice;
