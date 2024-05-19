import { apiSlice } from "./apiSlice";

const wishListApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getUserWishList: builder.query({
      query:()=> ({
        url:'/wishList'
      }),
      providesTags:["WishList"]
    }),
    addToWishList: builder.mutation({
      query:(productId)=> ({
        url:'/wishList',
        method:"POST",
        body:{productId}
      }),
      invalidatesTags:["WishList"]
    }),
    deleteItemFromWishList:builder.mutation({
      query:(productId)=>({
        url:'/wishList',
        method:"DELETE",
        body:{productId}
      }),
      invalidatesTags:["WishList"]
    })
  })
});

export const {useGetUserWishListQuery,useAddToWishListMutation, useDeleteItemFromWishListMutation}= wishListApiSlice