import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}api`,
    credentials: 'include',
    // prepareHeaders: (Headers) => {
    //   return Headers;
    // },
  }),
  tagTypes: ['Product', 'Order', 'User', "Notification"],
  endpoints: () => ({}),
});
