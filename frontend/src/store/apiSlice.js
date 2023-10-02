import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ramez-proshop.onrender.com/api",
    // baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (Headers) => {
      return Headers;
    },
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
