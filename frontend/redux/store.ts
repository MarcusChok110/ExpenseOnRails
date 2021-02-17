import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import accountSlice from './slices/account';
import transactionsSlice from './slices/transactions';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    account: accountSlice.reducer,
    transactions: transactionsSlice.reducer,
  },
});

export default store;
