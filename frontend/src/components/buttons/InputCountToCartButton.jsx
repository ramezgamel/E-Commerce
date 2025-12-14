import { useEffect } from "react";
import { useAddToCartMutation } from "../../store/cartApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import useIsIn from "../../hooks/useIsIn";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaHeart, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import FavButton from "./FavButton";

function InputCountToCartButton({ productId, countInStock }) {

  const [addToCart, { isLoading: addLoading }] = useAddToCartMutation();
  const [isInCart, isInWishList] = useIsIn(productId);
  const [qty, setQty] = useState(1);
  const { cart } = useSelector(state => state.offline);

  useEffect(() => {
    if (Object.entries(cart).length > 0) {
      let qty;
      cart?.cartItems?.map(item => {
        if (item.product._id === productId) { qty = item.quantity; }
      });
      setQty(qty);
    }
  }, [cart, productId]);

  const addToCartHandler = async () => {
    if (qty > countInStock) return toast.error("Out of stock");
    if (qty <= 0) return toast.error('Invalid quantity value');
    try {
      const cartId = localStorage.getItem("cartID");
      if (cartId) {
        await addToCart({ productId, cartId, quantity: qty }).unwrap();
      } else {
        const res = await addToCart({ productId, quantity: qty }).unwrap();
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-3"
      >
        <h3 className="font-semibold text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <FaMinus className="w-4 h-4" />
          </motion.button>
          <span className="w-12 text-center font-semibold ">{qty}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <FaPlus className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
      <ActionBtn isInWishList={isInWishList} productId={productId} addToCartHandler={addToCartHandler} />
    </>
    // <div className="flex items-center mt-3 justify-between md:px-10">
    //   <input
    //     className="w-14 py-2"
    //     value={qty}
    //     type="number"
    //     onChange={(e) => setQty(e.target.value)}
    //   />
    //   <button
    //     className="btn w-100"
    //     type="button"
    //     disabled={countInStock === 0 || addLoading}
    //     onClick={addToCartHandler}
    //   >
    //     {isInCart ? "Update cart" : "Add to cart"}
    //   </button>
    // </div>
  );
}

export default InputCountToCartButton;

const ActionBtn = ({ isInWishList, productId, addToCartHandler }) => {
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
    className="space-y-4"
  >
    <div className="flex gap-3 mt-4 items-center">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 ">
        <button onClick={addToCartHandler} size="lg" className="w-full flex justify-center gap-2 rounded-md text-white bg-gray-900 dark:bg-slate-200 dark:text-black py-2 ">
          <FaShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FavButton isInWishList={isInWishList} productId={productId} />
      </motion.button>
    </div>

  </motion.div>;

};