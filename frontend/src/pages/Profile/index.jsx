import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/userApiSlice';
import { useDispatch } from 'react-redux';
import { socket } from '../../socket';
import { toast } from 'react-toastify';
import { logout } from '../../store/authSlice';


function Profile() {
  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      socket.disconnect();
      dispatch(logout());
      navigate('/auth');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (<div className='flex mt-4 '>
    <aside  >
      <ul className='w-[146px] flex flex-col gap-2 pr-2 h-full'>
        <NavLink end to="" className={({isActive}) => `${isActive &&'bg-blue-700 text-white'} text-main  rounded-md text-center py-3 px-4 cursor-pointer transition-all hover:bg-blue-500`}>Personal data</NavLink>
        <NavLink to="orders" className={({isActive}) => `${isActive &&'bg-blue-700 text-white'} text-main  rounded-md text-center py-3 px-4 cursor-pointer transition-all hover:bg-blue-500`}>Orders</NavLink>
        <NavLink to="wishList" className={({isActive}) => `${isActive &&'bg-blue-700 text-white'} text-main  rounded-md text-center py-3 px-4 cursor-pointer transition-all hover:bg-blue-500`}>Wish list</NavLink>
        <NavLink to="addresses" className={({isActive}) => `${isActive &&'bg-blue-700 text-white'} text-main  rounded-md text-center py-3 px-4 cursor-pointer transition-all hover:bg-blue-500`}>Addresses</NavLink>
        <button onClick={logoutHandler} className='text-main block rounded-md bg-red-500 text-center py-3 px-4 cursor-pointer'>Logout</button>
      </ul>
    </aside>
    <main className='w-full bg-back px-4 sm:px-6 shadow h-[70vh] overflow-hidden sm:rounded-lg' >
      <Outlet/>
    </main>
  </div>
  );
}

export default Profile;
