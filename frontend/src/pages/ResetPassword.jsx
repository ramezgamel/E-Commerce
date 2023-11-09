import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../store/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/authSlice";

function ResetPassword() {
  const {token}= useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword] = useResetPasswordMutation();
  const {userInfo} = useSelector(state => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({token, password, confirmPassword}).unwrap();
      dispatch(setCredentials({ ...res }))
      toast.success("Password has been changed")
    } catch (err) {
      toast.error(err.data.message || 'something went wrong')
    }
  }
  return (
    <FormContainer>
    <form onSubmit={submitHandler}>
      <div className="my-2">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="mt-2 btn">Confirm</button>
    </form>
    </FormContainer>
  )
}

export default ResetPassword
