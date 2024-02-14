import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../store/userApiSlice";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const dispatch = useDispatch();
  const [logoutCall] = useLogoutMutation();
  const navigate = useNavigate();
  const logout = async () => {
      await logoutCall().unwrap();
      socket.disconnect()
      dispatch(logout());
      navigate('/login');
  };
  return [logout]
}

export default useLogout
