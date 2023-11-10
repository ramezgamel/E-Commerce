import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({keyword, page, sort, dec, category }) => {
        return ({
        url: `/products?page=${page}&limit=${import.meta.env.VITE_LIMIT}${
          keyword ? `&keyword=${keyword}` : ''
        }${sort && sort != '' ? `&sort=${dec}${sort}` : ''}${category && category!=''?`&category=${category}`:""}`,
        method: 'GET',
      })
      },
      providesTags: ['Product'],
    }),
    getProductsFeatures: builder.mutation({
      query: ({ keyword, page, sort, dec }) => ({
        url: `/products?page=${page}&limit=${import.meta.env.VITE_LIMIT}${
          keyword ? `&keyword=${keyword}` : ''
        }${sort && sort != '' ? `&sort=${dec}${sort}` : ''}`,
        method: 'GET',
      }),
      // providesTags: ['Product']
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) =>({
        url: `/products/${data.get("_id")}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}/review`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: '/products/top',
        method: 'GET',
      }),
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
