import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import {useGetUserAddressesQuery} from "../store/addressesApiSlice"
import { useState } from 'react';
import { toast } from 'react-toastify';
function Shipping() {
  const navigate = useNavigate();
  const [address,setAddress] = useState()
  const {data:addresses} = useGetUserAddressesQuery();
  const nextStep = () => {
    if(!address) return toast.error("Select address")
    localStorage.setItem('address',JSON.stringify(address));
    navigate('/payment');
  };
  return (
    <div className='h-[72vh] max-w-lg mx-auto'>
      <CheckoutSteps step1 step2 />
      <h1 className="my-5 text-2xl font-extrabold text-main">Select shipping address</h1>
      {addresses?.data.map(ad => 
        <div className='ml-8 flex my-4' key={ad.alias}>
          <input required type="radio" onChange={()=>setAddress(ad)} name='address' value={ad.alias} id={ad.alias} className='w-4 mr-4'/>
          <label htmlFor={ad.alias} className='flex items-center'>
            <div className="font-bold w-16 pr-2 border-r border-gray-600 text-main" >{ad.alias}</div>
            <div className="ml-2 flex flex-grow text-main justify-between items-center">
              {ad.details}
            </div>
          </label>
        </div>
      )}
      <button className="btn float-right" onClick={nextStep} >Continue</button>
    </div>
  );
}

export default Shipping;
