import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart:[],
  favorite:[],
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
    }
  }
})
export const {setCart, setFavorite} = offlineSlice.actions
export default  offlineSlice.reducer