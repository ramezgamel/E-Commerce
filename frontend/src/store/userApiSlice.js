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
      invalidatesTags: ['User'],
    }),
    getNotification: builder.query({
      query: () => ({
        url: "/users/notifications",
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags:['Notification'],
      invalidatesTags:['Order'],
    }),
    getUsers: builder.query({
      query: ({ keyword, page = 1, sort = '', dec = '+' }) => ({
        url: `/users?limit=${import.meta.env.VITE_LIMIT}&page=${page}${
          sort != '' ? `&sort=${dec}${sort}` : ''
        }${keyword ? `&keyword=${keyword}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: `/users/forgetPassword`,
        method: 'POST',
        body:email
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/users/resetPassword/${data.token}`,
        method: 'POST',
        body: {password: data.password, confirmPassword: data.confirmPassword}
      }),
    }),
    markAsRead: builder.mutation({
      query: (id)=>({
        url: `/users/notifications/${id}`,
        method: 'POST',
      }),
      invalidatesTags:['Notifications']
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation
} = userApiSlice;
