import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  type ICreateRowForm,
  type IUpdateRowForm,
  type IRowsResponse,
  IRowResponse,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const tableApi = createApi({
  reducerPath: 'tableApi',
  tagTypes: ['Rows'],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getRows: builder.query<IRowsResponse, void>({
      query: () => 'row/list',
    }),
    createRow: builder.mutation<IRowResponse, ICreateRowForm>({
      query: (body) => ({
        url: 'row/create',
        method: 'POST',
        body,
      }),
    }),
    updateRow: builder.mutation<IRowResponse, { id: number } & IUpdateRowForm>({
      query: ({ id, ...body }) => ({
        url: `row/${id}/update`,
        method: 'POST',
        body,
      }),
    }),
    deleteRow: builder.mutation({
      query: (id: number) => ({
        url: `row/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRowsQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = tableApi;
