import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: ['Users'],
    }),
    getUsers: builder.mutation({
      query: ({ keyword, page, sort = '', dec = '+' }) => ({
        url: `/users?limit=${import.meta.env.VITE_LIMIT}&page=${page}${
          sort != 'default' ? `&sort=${dec}${sort}` : ''
        }${keyword ? `&keyword=${keyword}:` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUsersMutation,
  useDeleteUserMutation,
} = userApiSlice;
