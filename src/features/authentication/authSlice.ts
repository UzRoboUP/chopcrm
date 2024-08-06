import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  staff_status: string;
  count: number;
};

type AuthState = {
  access_token: string | null;
  refresh_token: string | null;
  user: UserType | null;
  userId: string | null;
  isAuthenticated: boolean;
  // status: string;
  // error: null;
};

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  user: null,
  userId: null,
  isAuthenticated: false,
  // status: 'idle',
  // error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.access_token = payload;
      localStorage.setItem('access_token', payload);
      state.isAuthenticated = true;
    },
    setRefreshToken(state, { payload }) {
      state.refresh_token = payload;
      localStorage.setItem('refresh_token', payload);
    },
    setCredentials: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setTokenUserId: (state, { payload }) => {
      state.userId = payload;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.userId = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      state.isAuthenticated = false;
    },
  },
});

export const getToken = (state: { auth: AuthState }) => state.auth.access_token;
export const getUser = (state: { auth: AuthState }) => state.auth.user;
export const getRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refresh_token;

export const {
  setToken,
  setRefreshToken,
  setCredentials,
  setTokenUserId,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
