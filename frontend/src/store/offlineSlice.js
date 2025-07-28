import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart:{},
  favorite:[],
  cartID: localStorage.getItem("cartID") ? localStorage.getItem("cartID"): null
}
const offlineSlice = createSlice({
  name:"offlineState",
  initialState,
  reducers:{
    setCart: (state, action)=>{
      state.cart = action.payload;
    },
    setFavorite:(state, action) => {
      state.favorite = action.payload
    },
    setCartID:(state, action) => {
      state.cartID = action.payload
      localStorage.setItem("cartID", action.payload)
    },
    removeCartID:(state) => {
      state.cartID = null
      localStorage.removeItem("cartID")
    }
  }
})
export const {setCart, setFavorite,removeCartID, setCartID} = offlineSlice.actions
export default  offlineSlice.reducer