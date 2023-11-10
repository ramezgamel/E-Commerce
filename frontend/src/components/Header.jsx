import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useGetNotificationQuery, useLogoutMutation } from '../store/userApiSlice';
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
  AiOutlineSearch,
} from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BsFillMoonFill, BsFillSunFill, BsFillTrashFill } from 'react-icons/bs';
import { removeItem } from '../store/cartSlice';
import { useMarkAsReadMutation } from '../store/userApiSlice';
import { getNotification, setUser, socket } from '../socket';
import SideBar from './SideBar';
import Loader from './Loader';
function Header() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const {data, isLoading, refetch} = useGetNotificationQuery();
  const [markAsRead] = useMarkAsReadMutation()
  useEffect(()=> {
    if(userInfo){
      socket.on("connect", ()=> 
        setUser(userInfo)
      )
    }
  },[userInfo]);

  useEffect(()=>{
    if(!isLoading && data?.notifications){
      setNotifications([...data.notifications].reverse());
    const unRead = data.notifications.filter(n => n.isRead == false);
    setUnreadNotification([...unRead]);
  }
  },[data,isLoading]);
  useEffect(()=>{
    if(!userInfo) return 
    getNotification((res)=> {
      setNotifications([res,...data.notifications])
      setUnreadNotification([...unreadNotification, res]);
      refetch();
      toast.success(res.content)
    });
  },[data?.notifications, userInfo,refetch, unreadNotification]);

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
  // dark mode effect
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

  const markRead = async (id) => {
    try{
      await markAsRead(id).unwrap();
      refetch()
    }catch(err){
      toast.error(err.message| "Something went wrong")
    }
  }
  return (
    <header className="sticky top-0 z-50">
      <Disclosure as="nav" className="bd border-b bg-slate-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center  gap-2">
              {/* Mobile menu button*/}
              <Disclosure>
                {(window.location.pathname).startsWith('/admin')&&(
                  <Disclosure.Button className="text-gray-400 hover:text-white
                    block sm:hidden sm:mr-3">
                  <FaBars  />
                  <span className="sr-only">Open main menu</span>
                  </Disclosure.Button>
                )}
                <Disclosure.Panel as="div" className="absolute top-16 left-0 w-44 shadow-md">
                  <SideBar/>
                </Disclosure.Panel>
              </Disclosure>
              {/* LOGO  */}
              <div >
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
            </div>
            {/* FEATURES DARKMODE BILL IMAGE */}
            <div 
              className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <AiOutlineSearch className='text-main w-5 h-5 sm:hidden'/>
              <div className='hidden sm:block'>
                <SearchBox />
              </div>
              
              <button onClick={toggleMode} >
                {darkMode == 'dark' ? (
                  <BsFillSunFill className="h-5 w-5 text-main" />
                ) : (
                  <BsFillMoonFill className="h-5 w-5 text-main" />
                )}
              </button>
              <div className='h-10 w-[1px] bg-slate-900/10 dark:bg-slate-50/[0.06]  py-3'/>
              {/* Notification Bell  */}
              <Menu as="div" className="relative">
                <Menu.Button className="relative flex rounded-full bg-back text-main focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <AiOutlineBell 
                  onClick={()=>setUnreadNotification([])}
                  className="h-7 w-7 cursor-pointer hover:text-violet-600" aria-hidden="true" />
                  {unreadNotification?.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800">{unreadNotification?.length}</div>
                  )} 
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items as="ul" className="absolute right-0 top-3 z-10 mt-2 w-60 origin-top-right rounded-md bg-gray-700 max-h-48 shadow-lg ring-1 ring-black ring-opacity-5 p-0 focus:outline-none overflow-y-auto">
                    {isLoading && <Loader/>}
                    {notifications?.length > 0 && notifications?.map((notification, index) => 
                      <Link key={index} to={`${notification?.refId != undefined ? `order/${notification?.refId}`:"" }`}>
                      <Menu.Item as="li"
                        onClick={()=>markRead(notification?._id)}
                        className={`${notification?.isRead ? "":"bg-blue-500"} cursor-pointer text-main hover:bg-clicked px-2 py-1 rounded-md grid grid-cols-8 items-center gap-1 mb-1`}>
                          {data?.sender && ( 
                            <div className="col-span-2">
                              <img 
                              className='rounded-full w-10 h-10'
                              src={data?.sender?.image} alt={data.sender?.name}
                            />
                            </div>
                          )}
                        <div className={data?.sender?"col-span-6": "col-span-8"}>
                          <p className="m-0 text-sm">{notification?.content}</p>
                          <p className="text-gray-400 m-0 text-xs text-right">
                            {new Date(notification?.date).toLocaleTimeString("en-EG")}
                          </p>
                        </div>
                      </Menu.Item> 
                      </Link>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* CART  */}
              
              <div className='relative mr-1'>
                <AiOutlineShoppingCart
                  className=" h-7 w-7 text-main cursor-pointer hover:text-violet-600"
                  onClick={() => setOpen(true)}
                />
                {cartItems?.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800">{cartItems?.length}</div>
                  )}  
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
                    <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <div className='fixed inset-0 overflow-auto '>
                    <div className="pointer-events-none fixed inset-y-0 right-0 max-w-full">
                      <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-xs mt-14 bg-white overflow-auto"> 
                            <div className="flex justify-between pt-4 px-4">
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

                            <div className="p-4 overflow-auto 
                            h-[55vh]">
                              {cartItems?.length > 0 ? (
                                      <ul
                                        role="list"
                                        className="p-0"
                                      >
                                        {cartItems?.map((item) => (
                                          <li
                                            key={item._id}
                                            className="grid grid-cols-12 gap-1 mb-2"
                                          >
                                            <div className="col-span-4 overflow-hidden rounded-md border border-gray-200">
                                              <img
                                                src={import.meta.env.VITE_BASE_URL+ item.images[0]}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                              />
                                            </div>

                                            <div className="col-span-8">
                                              <p>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                  >
                                                    {item.name.slice(0,37)}
                                                  </Link>
                                              </p>
                                              <div className="flex items-center justify-between text-sm">
                                                <p className="text-gray-500 first-letter my-auto">
                                                  Qty {item.qty}
                                                </p>
                                                <p className='my-auto'>
                                                    {item.price}
                                                  </p>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 py-1 px-2 rounded-md hover:bg-red-600"
                                                    onClick={() =>
                                                      handleDelete(item?._id)
                                                    }
                                                  >
                                                    <BsFillTrashFill className='text-white'/>
                                                </button>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                              ) : (
                                <div className="alert">No Items</div>
                              )}
                            </div>
                            <div className="border-t border-gray-200 p-4 text-center">
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
                                    <span>or </span>
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
                          </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
              {/* Profile dropdown */}
              {userInfo?(<Menu as="div" className="relative inline-block text-left">
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
              </Menu>): <Link to="/login">Sign in</Link> }
              
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
  );
}

export default Header;
