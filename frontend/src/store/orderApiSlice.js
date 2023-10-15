import { apiSlice } from './apiSlice';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: { ...order },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
    }),
    getMyOrders: builder.query({
      query: (page) => ({
        url: `/orders/mine?limit=10&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.mutation({
      query: ({ keyword, page, sort = '', dec = '+' }) => ({
        url: `/orders?limit=${import.meta.env.VITE_LIMIT}&page=${page}${
          sort != 'default' ? `&sort=${dec}${sort}` : ''
        }${keyword ? `&keyword=${keyword}:` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersMutation,
  useDeliverOrderMutation,
} = orderApiSlice;
