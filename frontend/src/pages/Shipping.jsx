import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

function Shipping() {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [country, setCountry] = useState(shippingAddress?.county || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || '',
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();   
  const submitHandler = () => {
    dispatch(saveShippingAddress({ address, country, city, postalCode }));
    navigate('/payment');
  };
  return (
    <>
      <CheckoutSteps step1 step2 />
      <h1 className="my-2 text-main">Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label>Address</label>
          <input
            required
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className="my-2">
          <label>City</label>
          <input
            required
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div className="my-2">
          <label>Country</label>
          <input
            required
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div className="my-2">
          <label>PostalCode</label>
          <input
            required
            type="text"
            placeholder="Enter your postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn my-2">
          Continue
        </button>
      </form>
    </>
  );
}

export default Shipping;
