import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import {
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { removeItem } from '../store/cartSlice';
function Header() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
  const toggleMode = () => {
    if (darkMode == 'dark') {
      localStorage.setItem('theme', 'light');
      setDarkMode('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setDarkMode('dark');
    }
  };
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <header className="sticky top-0 z-50">
      <Disclosure as="nav" className="bd border-b bg-slate-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <FaBars className="absolute -inset-0.5 block sm:hidden" />
                <span className="sr-only">Open main menu</span>
              </Disclosure.Button>
            </div>
            {/* LOGO  AND NAVIGATION BAR*/}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/">
                <div className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="MHP"
                  />
                </div>
              </Link>
            </div>
            {/* FEATURES DARKMODE BILL IMAGE */}
            <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SearchBox />

              <button onClick={toggleMode}>
                {darkMode == 'dark' ? (
                  <BsFillSunFill className="h-4 w-4 text-main" />
                ) : (
                  <BsFillMoonFill className="h-4 w-4 text-main" />
                )}
              </button>
              {/* Notification Bell  */}
              <Menu as="div" className="relative">
                <Menu.Button className="relative flex rounded-full bg-back text-main focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <AiOutlineBell className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 top-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-back p-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item className="cursor-pointer text-main hover:bg-clicked">
                      <p>Payment Successfully</p>
                    </Menu.Item>
                    <Menu.Item className="cursor-pointer text-main hover:bg-clicked">
                      <p>Created product done</p>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* CART  */}
              <div>
                <AiOutlineShoppingCart
                  className="mr-1 h-5 w-5 cursor-pointer text-main hover:text-violet-600"
                  onClick={() => setOpen(true)}
                />
              </div>
              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                  <Dialog.Title className="text-lg font-medium text-gray-900">
                                    Shopping cart
                                  </Dialog.Title>
                                  <div className="ml-3 flex h-7 items-center">
                                    <button
                                      type="button"
                                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="absolute -inset-0.5" />
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <AiOutlineClose
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-8">
                                  <div className="flow-root">
                                    {cartItems.length > 0 ? (
                                      <ul
                                        role="list"
                                        className="-my-6 divide-y divide-gray-200"
                                      >
                                        {cartItems?.map((item) => (
                                          <li
                                            key={item._id}
                                            className="flex py-6"
                                          >
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                              />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                  <p>
                                                    <Link
                                                      to={`/product/${item._id}`}
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </p>
                                                  <p className="ml-4">
                                                    {item.price}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">
                                                  Qty {item.qty}
                                                </p>

                                                <div className="flex">
                                                  <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() =>
                                                      handleDelete(item?._id)
                                                    }
                                                  >
                                                    Remove
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <div className="alert">No Items</div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-gray-200 px-4 py-6 text-center sm:px-6">
                                <div>
                                  <Link
                                    to="/cart"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                  >
                                    Checkout
                                  </Link>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                  <p>
                                    or
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => setOpen(false)}
                                    >
                                      Continue Shopping
                                      <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
              {/* Profile dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={import.meta.env.VITE_BASE_URL + `${userInfo?.image}`}
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
                      {userInfo && userInfo.role == 'admin' && (
                        <Menu.Item>
                          <Link
                            to="/admin/dashboard"
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
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
  );
}

export default Header;
