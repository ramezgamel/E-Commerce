import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../store/orderApiSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { clearCartItems } from "../store/cartSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);
  
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map(item=> ({_id:item._id, qty:item.qty}))
        ,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="container text-main">
      <CheckoutSteps step1 step2 step3 />
      <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>
            <div>
              <h2>Order Items</h2>
              {cart.cartItems.length == 0 ? (
                <div role="alert" className="alert">Your cart is Empty</div>
              ) : (
                <div className="px-3">
                  {cart?.cartItems?.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 shadow-md my-2 p-2">
                        <div className="col-span-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-md"
                          />
                        </div>
                        <div className="col-span-5">
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </div>
                        <div className="col-span-4">
                          {item.qty} * ${item.price} = ${item.qty * item.price}
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
                  <p>{cart.itemsPrice}</p>
          </div>
          <div className="flex justify-between items-center">
                  <p>Shipping:</p>
                  <p>{cart.shippingPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Tax:</p>
            <p>{cart.taxPrice}</p>
          </div>
          <div className="flex justify-between items-center">
                  <p>Total:</p>
                  <p>{cart.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
                {error && <h3 role="alert" className="alert">{error}</h3>}
          </div>
          <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="btn"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
                {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
