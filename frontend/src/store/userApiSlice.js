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
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: `/users/forgetPassword`,
        method: 'POST',
        body:{email}
      }),
    }),
    verifyCode: builder.mutation({
      query: (resetCode) => ({
        url: '/users/verifyCode',
        method: 'POST',
        body: {resetCode},
      }),
    }),
    resetPassword: builder.mutation({
      query: ({password,confirmPassword, email}) => ({
        url: '/users/resetPassword',
        method: 'PUT',
        body: {password,confirmPassword, email}
      }),
    }),
    logout:builder.mutation({
      query:()=>({
        url:"/users/logout",
        method:"POST"
      })
    }),
    updateUser: builder.mutation({
      query: (data) =>({
        url: '/users/profile',
        method: 'PUT',
        body: data ,
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
  useVerifyCodeMutation,
  useResetPasswordMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation
} = userApiSlice;
