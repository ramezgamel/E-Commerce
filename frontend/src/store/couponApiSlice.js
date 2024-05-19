import { apiSlice } from "./apiSlice";

const couponApiSLice = apiSlice.injectEndpoints({
  endpoints:builder=>({
    getCoupons:builder.query({
      query:()=>({
        url:"/coupons",
      }),
      providesTags:["Coupon"]
    }),
    getCoupon:builder.query({
      query:(data)=>({
        url:`/coupons/getOne?couponName=${data}`,
      }),
    }),
    createCoupon:builder.mutation({
      query:({name,expire,discount})=>({
        url:"/coupons",
        method:"POST",
        body:{name,expire,discount}
      }),
    }),
    updateCoupon:builder.mutation({
      query:({name,expire,discount, couponId})=>({
        url:`/coupons/${couponId}`,
        method:"PUT",
        body:{name,expire,discount}
      }),
    }),
    deleteCoupon:builder.mutation({
      query:(couponId)=>({
        url:`/coupons/${couponId}`,
        method:"DELETE",
      }),
    })
  })
});

export const {useGetCouponQuery, useLazyGetCouponQuery ,useDeleteCouponMutation, useUpdateCouponMutation ,useCreateCouponMutation, useGetCouponsQuery}= couponApiSLice