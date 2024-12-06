import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from './types';
import { UserInput } from 'src/models/Users/UserSchema';
import { UserUpdateInput } from 'src/models/Users/UserUpdateSchema';

const API_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}admin/user/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: ['FetchAllUsers'],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<any, void>({
      query() {
        return {
          url: 'fetch',
          method: 'GET'
        };
      },
      providesTags: ['FetchAllUsers']
    }),
    fetchUserById: builder.query<any, any>({
      query(id) {
        return {
          url: `fetch/${id}`,
          method: 'GET'
        };
      },
      providesTags: ['FetchAllUsers']
    }),
    createUser: builder.mutation<IGenericResponse, UserInput>({
      query(body: any) {
        return {
          url: `create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['FetchAllUsers']
    }),
    updateUserById: builder.mutation<IGenericResponse, UserUpdateInput>({
      query(body) {
        return {
          url: `update/${body.id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['FetchAllUsers']
    }),
    deleteUserById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['FetchAllUsers']
    }),
    deleteAllTestProjects: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `delete`,
          method: 'DELETE'
        };
      }
    })
  })
});

export const {
  useFetchAllUsersQuery,
  useCreateUserMutation,
  useDeleteAllTestProjectsMutation,
  useDeleteUserByIdMutation,
  useFetchUserByIdQuery,
  useUpdateUserByIdMutation
} = userApi;
