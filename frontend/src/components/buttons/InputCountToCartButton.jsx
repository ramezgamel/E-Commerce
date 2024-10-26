import { useEffect } from "react";
import { useAddToCartMutation } from "../../store/cartApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import useIsIn from "../../hooks/useIsIn";
import { toast } from "react-toastify";

function InputCountToCartButton({productId, countInStock}) {

    const [addToCart, {isLoading:addLoading}] = useAddToCartMutation();
    const [isInCart] = useIsIn(productId)
    const [qty, setQty] = useState(1)
  const {cart} = useSelector(state => state.offline);

  useEffect(()=> {
    if(cart) {
      let qty ;
      cart.cartItems.map(item => {
        if(item.product._id === productId) {qty = item.quantity}
      }) ;
      setQty(qty)
    }
  }, cart)

  const addToCartHandler = async () => {
    if (qty > countInStock) return toast.error("Out of stock");
    if (qty <= 0) return toast.error('Invalid quantity value');
    try {
      const cartId = localStorage.getItem("cartID");
      if (cartId) {
        await addToCart({ productId, cartId, quantity:qty }).unwrap();
      } else {
        const res = await addToCart({ productId, quantity:qty }).unwrap();
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="flex items-center mt-3 justify-between md:px-10">
      <input
                    className="w-14 py-2"
                    value={qty}
                    type="number"
                    onChange={(e) => setQty(e.target.value)}
                  />
                  <button
                    className="btn w-100"
                    type="button"
                    disabled={countInStock === 0 || addLoading}
                    onClick={addToCartHandler}
                  >
                    {isInCart ? "Update cart" : "Add to cart"}
                  </button>
    </div>
  )
}

export default InputCountToCartButton
