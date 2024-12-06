import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import { api } from './api/api';
import { userApi } from './api/userApi';
import authSlice, { checkAuth } from './slices/authSlice';
import roleSlice from './slices/roleSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    role: roleSlice,
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat([userApi.middleware])
      .concat([authApi.middleware])
      .concat([api.middleware])
});

store.dispatch(checkAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
