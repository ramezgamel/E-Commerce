import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({
    // getProduct: builder.query({
    //   query: () => `/api/products`,
    // }),
  }),
});

export const { useGetProductQuery } = apiSlice;
