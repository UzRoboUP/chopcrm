import { createSlice } from '@reduxjs/toolkit';

type SessionType = {
  isAuthenticated: boolean;
  token: unknown;
};

const initialState: SessionType = {
  isAuthenticated: true,
  token: '',
};

export const SessionSlice = createSlice({
  name: 'auth/session',
  initialState,
  reducers: {
    signIn: (state: SessionType, action: { payload: string }) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    signOut: (state: SessionType) => {
      state.isAuthenticated = false;
      state.token = '';
    },
  },
});
export const {signIn,signOut} = SessionSlice.actions
export default SessionSlice.reducer;
