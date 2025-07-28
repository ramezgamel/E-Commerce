import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../store/orderApiSlice";
import CheckoutSteps from "../../components/CheckoutSteps";
import { toast } from "sonner";
import Loader from "../../components/Loader";
import { removeCartID, setCart } from "../../store/offlineSlice";
import { useLazyCheckoutSessionQuery } from "../../store/orderApiSlice";
import { paymentSuccess } from "../../socket";
function PlaceOrder() {
  const navigate = useNavigate();
  const [address] = useState(JSON.parse(localStorage.getItem("address")));
  const [paymentMethod] = useState(localStorage.getItem("paymentMethod"));
  const { cart, cartID:cartId } = useSelector((state) => state.offline);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [checkoutSession, { isLoading: checkoutLoading }] = useLazyCheckoutSessionQuery();
  
  useEffect(() => {
    if (!cart) {
      navigate("/");
    }
    if (!address) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart, address, paymentMethod]);


  const placeOrderHandler = async () => {
    try {
      let res;
      if (paymentMethod == "cash") {
        res = await createOrder({
          cartId,
          address,
          paymentMethod
        }).unwrap();
        dispatch(setCart({}));
        dispatch(removeCartID())
        paymentSuccess({
          date:Date.now(),
          refId:res.data._id,
        })
        navigate(`/order/${res.data._id}`);
      }
      if (paymentMethod == "card") {
        res = await checkoutSession(cartId).unwrap();
        window.location.href = res.url;
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="mx-16 text-main ">
      <CheckoutSteps step1 step2 step3 />
      <div className="grid grid-cols-12 mt-4 ">
        <div className="col-span-8 pr-4">
          <div>
            <h2 className="text-2xl text-center my-3 font-extrabold">Shipping</h2>
            <p>
              <strong>Address: </strong>
            </p>
          </div>
          <p> <strong>Payment Method:</strong> {paymentMethod}</p>
          <div>
            <hr />
            <h2 className="text-xl font-bold">Order Items</h2>
            {cart?.cartItems?.length == 0 ? (
              <div role="alert" className="alert">Your cart is Empty</div>
            ) : (
              <div className="px-3">
                {cart?.cartItems?.map((item) => (
                  <div key={item.product._id} className="grid grid-cols-12 gap-2 shadow-md my-2 p-2">
                    <div className="col-span-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="rounded-md"
                      />
                    </div>
                    <div className="col-span-5">
                      <Link className="line-clamp-2" to={`/products/${item.product._id}`}>{item.product.name}</Link>
                    </div>
                    <div className="col-span-4">
                      {item.quantity} * {item.price} = {item.quantity * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4">
          <h2>Order Summary</h2>
          <div className="flex justify-between items-center">
            <p>Items price:</p>
            <p>{cart?.totalPriceAfterDisCount ? cart?.totalPriceAfterDisCount : cart?.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Shipping:</p>
            <p>{cart?.shipping}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Tax:</p>
            <p>{cart?.tax}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total:</p>
            <p>{cart?.totalPriceAfterDisCount ? cart?.totalPriceAfterDisCount : cart?.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            {error && <h3 role="alert" className="alert">{error}</h3>}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn"
              onClick={placeOrderHandler}
            >
              {isLoading || checkoutLoading ? <Loader /> : "Place Order"} </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
