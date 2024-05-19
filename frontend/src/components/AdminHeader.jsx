import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { Disclosure, Transition, Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { CiLogout } from 'react-icons/ci';
import { useLogoutMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '../store/authSlice';
import { useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useEffect } from 'react';

function AdminHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutCall] = useLogoutMutation();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMode = () => {
    if (darkMode == 'dark') {
      localStorage.setItem('theme', 'light');
      setDarkMode('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setDarkMode('dark');
    }
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate('/auth');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <nav className="bd relative flex items-center justify-between border-b bg-slate-50 p-2 dark:bg-gray-800 md:justify-end">
      {/* SIDEBAR  */}
      <Disclosure as="div" className="md:hidden">
        <Disclosure.Button>
          <FaBars className="cursor-pointer text-main hover:text-violet-600" />
        </Disclosure.Button>
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-80"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Disclosure.Panel
            as="ul"
            className="bd absolute left-0 top-14 z-10 flex h-screen w-[160px] flex-col border-r border-gray-200 bg-slate-100 pl-1 pt-2 text-center font-medium text-gray-700 text-main dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 md:hidden"
          >
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                      : ''
                  } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
                }
              >
                <MdOutlineSpaceDashboard />
                <div>Dashboard</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                      : ''
                  } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
                }
              >
                <AiOutlineUser />
                <div>Users</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                      : ''
                  } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
                }
              >
                <AiOutlineShoppingCart />
                <div>Orders</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                      : ''
                  } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
                }
              >
                <AiOutlineShop />
                <div>Products</div>
              </NavLink>
            </li>
          </Disclosure.Panel>
        </Transition.Child>
      </Disclosure>

      {/* Control  */}
      <div className="flex cursor-pointer items-center gap-3">
        <AiOutlineBell className="h-6 w-6 hover:text-violet-500" />
        <button onClick={toggleMode}>
          {darkMode == 'dark' ? (
            <BsFillSunFill className="h-4 w-4 text-main" />
          ) : (
            <BsFillMoonFill className="h-4 w-4 text-main" />
          )}
        </button>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <div className="bd flex items-center gap-1 border-l pl-3 hover:text-violet-500">
              <div>
                <img
                  className="h-8 w-8 rounded-full focus:ring-1 focus:ring-white"
                  src={userInfo?.image}
                />
              </div>
              Ramez
              <BsChevronDown />
            </div>
          </Menu.Button>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className="absolute right-2 z-30 overflow-hidden rounded-md bg-white p-0 py-2 text-black shadow-md"
            >
              <Menu.Item as="li">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-8 py-2 text-black hover:bg-slate-200"
                >
                  <AiOutlineUser />
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-8 py-2 text-black hover:bg-slate-200"
                >
                  <AiOutlineHome />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item as="li">
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 px-8 py-2 text-black hover:bg-slate-200"
                >
                  <CiLogout />
                  Logout
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition.Child>
        </Menu>
      </div>
    </nav>
  );
}

export default AdminHeader;
