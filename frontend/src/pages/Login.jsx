import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  // const [formType, setFormType] = useState('login');
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
    <FormContainer>
      <h1 className="text-main">Sign In</h1>
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
        <button type="submit" className="btn my-2" disabled={isLoading}>
          Sign In
        </button>
        {isLoading && <Loader />}
      </form>
      <div className="py-1 text-main">
        Create new account <Link to="/register">Register</Link>
      </div>
    </FormContainer>
  );
}

export default Login;
