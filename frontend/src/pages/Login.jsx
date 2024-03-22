import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import Loader from '../components/Loader';
import {motion as m} from "framer-motion"
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await login({ email, password }).unwrap();
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
    <m.form 
        layoutScroll
        // initial={{y:-220}}
        // animate={{y:0}}
        transition={{
          duration:2
        }}
      onSubmit={submitHandler} className='mt-10'>
        <div className="my-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='text-center px-14 mt-5'>
          <button type="submit" className="btn w-full" disabled={isLoading}>
            {isLoading && <Loader />}
            {!isLoading && 'Sign in'}
          </button>
        </div>
    </m.form>
  );
}

export default Login;