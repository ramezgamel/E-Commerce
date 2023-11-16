import { apiSlice } from "./apiSlice";

export const catApiSlice = apiSlice.injectEndpoints(({
  endpoints:(builder) =>({
    getCats: builder.query({
      query: (page=1) => ({
        url:`/category?limit=${import.meta.env.VITE_LIMIT}&page=${page}`,
        method:"GET"
      }),
      providesTags:['Category']
    }),
    createCats: builder.mutation({
      query: (data) =>({
        url:'/category',
        method:'POST',
        body:data
      }),
      invalidatesTags: ['Category']
    }),
    deleteCat: builder.mutation({
      query:(id)=>({
        url:`/category/${id}`,
        method:"DELETE"
      }),
      invalidatesTags:["Category"]
    }),
    updateCat: builder.mutation({
      query: (data) => ({
        url:`/category/${data.get("_id")}`,
        method:"PUT",
        body:data
      }),
      invalidatesTags:['Category']
    })
  })
}));

export const {useGetCatsQuery, useCreateCatsMutation, useDeleteCatMutation, useUpdateCatMutation}= catApiSlice;