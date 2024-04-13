import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: unknown;
  status: string;
};

const initialState: AuthState = {
  token: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<object>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const getToken = (state: { auth: AuthState }) => state.auth.token;

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
