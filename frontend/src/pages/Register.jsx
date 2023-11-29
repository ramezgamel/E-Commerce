import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState({});
  const [previewSource, setPreviewSource] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email)
      formData.append("password", password)
      formData.append("name", name);
      formData.append("image", image);

      const res = await register(formData).unwrap();
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
      <h1 className="text-main">Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className="my-3">
          <label>Name</label>
          <input
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label>Profile Image</label>
          {previewSource && <div className='my-1 flex justify-center'>
            <img className='rounded-full w-36 h-36' src={previewSource} />
          </div> }
          <input
            type="file"
            onChange={handleFileChange}
          />
          
        </div>
        <div className="my-3">
          <label>password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn my-3 " disabled={isLoading}>
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
