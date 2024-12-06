import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isExpired } from 'react-jwt';
import getToken from '../utils/getToken';
import { redirect } from 'react-router';
import { setRole } from './roleSlice';
import { AppDispatch } from '../store';

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
  isVerified: boolean;
  userIdentifier: string;
  salt: null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  affectations: Array<any>;
};

export type AuthState = {
  user: any;
  token: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    getUser: (state) => {
      return { user: state.user, token: state.token };
    }
  }
});

export const { setUser, clearUser, getUser } = authSlice.actions;
export default authSlice.reducer;

export const checkAuth = () => (dispatch) => {
  const { user, token } = dispatch(getUser());
  if (token) {
    if (isExpired(token)) {
      localStorage.removeItem('token');
      dispatch(clearUser());
      return redirect('/login');
    } else {
      dispatch(setUser({ token, user }));
    }
  }
};

export const normalizeRole = (role: string) => {
  switch (role) {
    case 'ROLE_VISITOR':
      return 'Visitor';
      break;
    case 'ROLE_TESTER':
      return 'Tester';
      break;
    case 'ROLE_ADMIN':
      return 'Admin';
      break;
    default:
      return 'Visitor';
      break;
  }
};

export const login = (token: string, user: any) => (dispatch) => {
  localStorage.setItem('token', token);
  dispatch(setUser({ token, user }));
  dispatch(setRole(normalizeRole(user.roles[0])));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(clearUser());
  dispatch(setRole(null));
};

export const user = () => (dispatch) => {
  return dispatch(getUser());
};
