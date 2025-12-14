import { toast } from "sonner";
import { useAddToCartMutation, useDeleteFromCartMutation } from "../../store/cartApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Loader from "../common/Loader";
import { setCartID } from "../../store/offlineSlice";
import { FaTrash } from "react-icons/fa";

function AddToCartBtn({ productId, isInCart, withText, qty }) {
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
        await addToCart({ productId: productId, cartId: cartID, quantity: qty || 1 }).unwrap();
      } else {
        const res = await addToCart({ productId: productId, quantity: qty || 1 }).unwrap();
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
  if (removeCartLoad || addCartLoad) return <Loader />;
  return (
    <button className=' flex w-full  justify-center items-center gap-2 rounded-md p-2 shadow-md cursor-pointer bg-gray-200 text-black hover:scale-[1.1] hover:bg-blue-600 '>
      {isInCart ? <>
        <FaTrash onClick={(e) => removeFromCartHandler(e, productId)} className='text-red-600 ' />
        {withText && <span>Remove from cart</span>}
      </> :
        <>
          <MdOutlineAddShoppingCart onClick={addToCartHandler} />
          {withText && <span>Add to cart</span>}
        </>
      }

    </button>
  );
}

export default AddToCartBtn;
