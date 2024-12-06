import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGenericResponse, ILoginResponse } from './types';
import { useNavigate } from 'react-router-dom';
import { LoginInput } from 'src/content/overview/Login';
import { RegisterInput } from 'src/content/overview/Register';

const API_URL = process.env.REACT_APP_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(body) {
        return {
          url: 'register',
          method: 'POST',
          body
        };
      },
      async onQueryStarted(user, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('User registered, ', data.message);
        } catch (error) {
          console.error('There was an error registering: ', error);
        }
      }
    }),
    loginUser: builder.mutation<ILoginResponse, LoginInput>({
      query(credentials) {
        return {
          url: 'login',
          method: 'POST',
          body: credentials
        };
      },
      async onQueryStarted(user, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Token retrieved: ', data.token);
        } catch (error) {
          console.error('There was an error registering: ', error);
        }
      }
    })
  })
});
export const logout = () => {
  // const navigate = useNavigate()
  localStorage.clear();
  // navigate('/auth');
};

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
