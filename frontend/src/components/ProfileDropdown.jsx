/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/userApiSlice";
import { socket } from "../socket";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";

function ProfileDropdown({isLoggedIn,userInfo}) {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [logoutCall]= useLogoutMutation();
  

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      socket.disconnect()
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={ userInfo?.image}
                    alt=""
                  />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <AiOutlineUser className="h-5 w-5" />
                  Your Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={logoutHandler}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <CiLogout className="h-5  w-5" />
                  Logout
              </button>
            </Menu.Item>
            {(isLoggedIn && userInfo?.role == 'admin' )&& (
              <Menu.Item>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineSpaceDashboard className="h-5 w-5" /> 
                  Dashboard
                </Link>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdown
