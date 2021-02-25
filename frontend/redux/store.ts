import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import accountSlice from './slices/account';
import transactionsSlice from './slices/transactions';
import undoable from 'redux-undo';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    user: undoable(userSlice.reducer),
    account: undoable(accountSlice.reducer),
    transactions: undoable(transactionsSlice.reducer),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
