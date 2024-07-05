import { useEffect, useState } from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("address"));
    if(!address) navigate('/shipping')
  }, [navigate]);

  const nextStep = () => {
    if(!paymentMethod) return toast.error("Select payment method")
    localStorage.setItem("paymentMethod",paymentMethod)
    navigate("/placeorder");
  };
  return (
    <div className="h-[72vh] max-w-lg mx-auto">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="my-5 text-2xl font-extrabold text-main">Payment Method</h1>
        <div className="flex gap-2">
          <input id="cash" defaultChecked onChange={()=>setPaymentMethod('cash')} type="radio" name="payment" value="cash" className="w-4 h-4"/>
          <label htmlFor="cash">Cash</label>
        </div>
        <div className="flex gap-2">
          <input id="card" onChange={()=>setPaymentMethod('card')} type="radio" name="payment"  value="card" className="w-4 h-4 "/>
          <label htmlFor="card">Card</label>
        </div>
        <button onClick={nextStep} className="btn mt-2 float-right">
          Continue
        </button>
    </div>
  );
}

export default Payment;
