import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`,
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});
export const { useGetProductQuery, useGetProductByIdQuery } = productsApiSlice;
