import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/mine`,
        method: "GET",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/order/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = orderApiSlice;
