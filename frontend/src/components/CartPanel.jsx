/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../store/offlineSlice";
import { useGetUserCartQuery } from "../store/cartApiSlice.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

function CartPanel({cartID}) {
  const dispatch = useDispatch();
  const { data: cart } = useGetUserCartQuery(cartID);
  
  useEffect(() => {
    dispatch(setCart(cart?.data));
  }, [cart?.data]);
  
  return (
    <Link className='relative' to={cart ? `/cart` : '/'}>
      {cart?.data.cartItems?.length > 0 && <span className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800'>{cart?.data.cartItems?.length}</span>}
      <AiOutlineShoppingCart className="h-7 w-7 text-main cursor-pointer hover:text-violet-600" />
    </Link>
  );
}

export default CartPanel;
