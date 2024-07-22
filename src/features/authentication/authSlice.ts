import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  user: object | null;
  // status: string;
  // error: null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  // status: 'idle',
  // error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setCredentials: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const getToken = (state: { auth: AuthState }) => state.auth.token;

export const { setToken, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
