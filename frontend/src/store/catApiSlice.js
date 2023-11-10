import { apiSlice } from "./apiSlice";

export const catApiSlice = apiSlice.injectEndpoints(({
  endpoints:(builder) =>({
    getCats: builder.query({
      query: () => ({
        url:'/category',
        method:"GET"
      }),
      providesTags:['Category']
    }),
    createCats: builder.query({
      query: (data) => ({
        url:'/category',
        method:"POST",
        body:data
      })
    })
  })
}));

export const {useGetCatsQuery}= catApiSlice;