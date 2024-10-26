import { useSelector } from "react-redux";

function useIsIn(productId) {
  const { cart,favorite } = useSelector(state => state.offline);
  const isInCart = cart?.cartItems?.some(item => item.product._id == productId)
  const isInWishList = favorite?.some(item => item._id == productId)
  return [isInCart, isInWishList]
}

export default useIsIn
