import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForgetPasswordMutation, useLoginMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formType, setFormType] = useState('login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const [forgetPassword] = useForgetPasswordMutation()
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if(formType == 'forgetPassword'){
        await forgetPassword({email}).unwrap();
        toast.success("Email has been sent")
      }else {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  return (
    <FormContainer>
      <h1 className="text-main text-center font-bold text-3xl">{formType == 'forgetPassword'? "Forget Password": formType == 'login'&&"Sign in" }</h1>
      <form onSubmit={submitHandler}>
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
        {
          formType == "login" && <div className="my-2">
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        }
        <button type="submit" className="btn my-2" disabled={isLoading}>
          {formType == 'login'? "Sign in" : formType == 'forgetPassword' && "Send "}
        </button>
        {isLoading && <Loader />}
      </form>
      <button onClick={()=> setFormType(prev => prev=='forgetPassword'? "login":"forgetPassword")} className="py-1 text-blue-600 hover:text-blue-800">
        {formType == 'login'? "Forget Password" : formType == 'forgetPassword' && "Login"}
      </button>
      <div className="py-1 text-main">
        Create new account <Link to="/register" className='text-blue-500'>Register</Link>
      </div>
    </FormContainer>
  );
}

export default Login;