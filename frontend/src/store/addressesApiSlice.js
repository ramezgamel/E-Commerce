import { apiSlice } from "./apiSlice";

const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getUserAddresses: builder.query({
      query:()=> ({
        url:'/addresses'
      }),
      providesTags:["Addresses"]
    }),
    addToAddresses: builder.mutation({
      query:(data)=> ({
        url:'/addresses',
        method:"POST",
        body:data
      }),
      invalidatesTags:["Addresses"]
    }),
    deleteFromAddresses:builder.mutation({
      query:(addressId)=>({
        url:'/addresses',
        method:"DELETE",
        body:{addressId}
      }),
      invalidatesTags:["Addresses"]
    })
  })
});

export const {useGetUserAddressesQuery,useAddToAddressesMutation, useDeleteFromAddressesMutation}= addressesApiSlice