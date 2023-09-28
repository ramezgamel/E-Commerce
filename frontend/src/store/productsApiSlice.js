import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (page) => ({
        url: `/products?limit=10&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProductsFeatures: builder.mutation({
      query: (q) => ({
        url: `/products?keyword=${q.keyword || ""}&sort=${q.sort || ""}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}/review`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Products"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: "/products/top",
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetProductsFeaturesMutation,
  useGetProductQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
