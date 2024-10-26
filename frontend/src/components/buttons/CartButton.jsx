import { toast } from "react-toastify";
import { useAddToCartMutation, useDeleteFromCartMutation } from "../../store/cartApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Loader from "../Loader";
import { setCartID } from "../../store/offlineSlice";
import { FaTrash } from "react-icons/fa";

function CartButton({ productId, isInCart }) {
  const [removeFromCart, { isLoading: removeCartLoad }] = useDeleteFromCartMutation();
  const [addToCart, { isLoading: addCartLoad }] = useAddToCartMutation();
  const { cartID } = useSelector(state => state.offline);
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const addToCartHandler = async (e) => {
    e.preventDefault();
    if (userInfo?.role == "admin") return toast.error("Unavailable for admins");
    try {
      if (cartID) {
        await addToCart({ productId: productId, cartId: cartID }).unwrap();
      } else {
        const res = await addToCart({ productId: productId }).unwrap();
        dispatch(setCartID(res._id));
      }
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err);
    }
  };
  const removeFromCartHandler = async (e, productId) => {
    e.preventDefault();
    const cartId = localStorage.getItem("cartID");
    if (!cartId) return toast.error("Invalid cart");
    try {
      await removeFromCart({ cartId, productId }).unwrap();
      toast.success("Removed successfully");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <span className='absolute w-9 h-9 p-2 flex justify-center items-center  rounded-md bottom-2 right-2 shadow-md cursor-pointer bg-white hover:scale-[1.15] hover:bg-blue-600 '>
      {removeCartLoad || addCartLoad ? <Loader /> : isInCart ? <FaTrash onClick={(e) => removeFromCartHandler(e, productId)} className='text-red-600 w-full h-full' /> :
        <MdOutlineAddShoppingCart onClick={addToCartHandler} className='text-gray-800 w-full h-full' />
      }
    </span>
  );
}

export default CartButton;
