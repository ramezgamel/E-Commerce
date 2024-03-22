import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import { toast } from 'react-toastify';
import Progress from '../components/Progress';
import useUpload from '../hooks/useUpload';
import useLoggedIn from '../hooks/useLoggedIn';
import Loader from '../components/Loader';
import {motion as m} from "framer-motion"


function Register() {
  const navigate = useNavigate()
  const emailInput = useRef();
  const passwordInput = useRef();   
  const nameInput = useRef();
  const PhoneNumberInput = useRef();
  const dispatch = useDispatch();
  useLoggedIn()
  const [register, { isLoading }] = useRegisterMutation();
  const {images, error, preview, progress, isUploaded, uploadData} = useUpload()
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data ={
        email:emailInput.current.value, 
        password: passwordInput.current.value,
        name: nameInput.current.value,
        phoneNumber: PhoneNumberInput.current.value,
        image:images
      }
      const res = await register(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Successfully")
      navigate("/")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <m.form 
      layoutScroll 
      // initial={{y:-450}}
      // animate={{y:0}}
      transition={{
        duration:2
      }}
      onSubmit={submitHandler} className='mt-10'>
        <div className="my-2">
          <label>Name</label>
          <input
            type="name"
            placeholder="Enter your name"
            ref={nameInput}
          />
        </div>
        <div className="my-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            ref={emailInput}
          />
        </div>
        <div className="my-2">
          <label>Phone number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            ref={PhoneNumberInput}
          />
        </div>
        <div className="my-2">
          <label>Profile Image</label>
          {error ? <div className="alert">{error.message}</div> : 
            preview  && 
              <div className='my-2 flex justify-center'>
                <img className='rounded-full w-36 h-36' src={preview[0]} />
              </div>
          }
          {Boolean(progress) &&  images &&  !isUploaded && <Progress progress={progress}/> }
          <input
            type="file"
            onChange={(e)=>uploadData(e.target.files)}
          />
          
        </div>
        <div className="my-2">
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            ref={passwordInput}
          />
        </div>
        <div className='text-center px-14 mt-5'>
          <button type="submit" className="btn w-full" disabled={isLoading}>
            {isLoading && <Loader />}
            {!isLoading && 'Sign up'}
          </button>
        </div>
    </m.form>
  );
}

export default Register;
