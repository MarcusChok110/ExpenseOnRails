import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import accountSlice from './slices/account';
import transactionsSlice from './slices/transactions';
import undoable from 'redux-undo';

const store = configureStore({
  reducer: {
    user: undoable(userSlice.reducer),
    account: undoable(accountSlice.reducer),
    transactions: undoable(transactionsSlice.reducer),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
