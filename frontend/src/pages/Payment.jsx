import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../store/cartSlice";
function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="container">
      
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-main mb-3">Payment Method</h1>
      <form onSubmit={submitHandler} className="px-2">
        <div className="flex gap-2">
          <input id="paymentMethod" type="checkbox" value="PayPal" onClick={(e)=>setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="paymentMethod">PayPal</label>
        </div>
        <div className="flex gap-2">
          <input id="paymentMethod" type="checkbox" value="vodafoneCash" onClick={(e)=>setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="paymentMethod">Vodafone Cash</label>
        </div>
        <button type="submit" className="btn mt-2">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Payment;
