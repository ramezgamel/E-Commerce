import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (page) => ({
        url: `/products?limit=10&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductsFeatures: builder.mutation({
      query: ({ keyword, page, sort, dec }) => ({
        url: `/products?page=${page}&limit=${import.meta.env.VITE_LIMIT}${
          keyword ? `&keyword=${keyword}` : ''
        }${sort && sort != 'default' ? `&sort=${dec}${sort}` : ''}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: 'PUT',
        body: product,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Products'],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}/review`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Products'],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: '/products/top',
        method: 'GET',
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
