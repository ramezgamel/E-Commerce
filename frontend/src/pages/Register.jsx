import { useEffect, useRef } from 'react';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import { toast } from 'react-toastify';
// import axios from 'axios';
import Progress from '../components/Progress';
import useUpload from '../hooks/useUpload';


function Login() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const nameInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const {images, error, preview, progress, isUploaded, uploadData} = useUpload()
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data ={
        email:emailInput.current.value, 
        password: passwordInput.current.value,
        name: nameInput.current.value,
        image:images
      }
      const res = await register(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);
  return (
    <FormContainer>
      <h1 className="text-main mt-16">Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className="my-3">
          <label>Name</label>
          <input
            type="name"
            placeholder="Enter your name"
            ref={nameInput}
          />
        </div>
        <div className="my-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            ref={emailInput}
          />
        </div>
        <div className="my-3">
          <label>Profile Image</label>
          {error ? <div className="alert">{error.message}</div> : 
            preview  && 
              <div className='my-2 flex justify-center'>
                <img className='rounded-full w-36 h-36' src={preview[0]} />
              </div>
          }
          {progress & images & !isUploaded && <Progress progress={progress}/> }
          <input
            type="file"
            onChange={(e)=>uploadData(e.target.files)}
          />
          
        </div>
        <div className="my-3">
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            ref={passwordInput}
          />
        </div>
        <button type="submit" className="btn my-3 " disabled={isLoading | progress != 100}>
          Sign Up
        </button>
      </form>
      <div className="py-3 text-main">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </FormContainer>
  );
}

export default Login;
