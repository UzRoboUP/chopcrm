import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
const store = configureStore({
  reducer: {
    // user: 'user',
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
