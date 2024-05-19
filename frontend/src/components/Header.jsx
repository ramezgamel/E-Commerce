/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { memo, useEffect, useState } from 'react';
import { Disclosure, } from '@headlessui/react';
import {  FaRegHeart } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai';
import Modal from "../components/Modal"
import useLoggedIn from '../hooks/useLoggedIn';
import ModeToggler from './ModeToggler';
import NotificationsPanel from './NotificationsPanel';
import ProfileDropdown from './ProfileDropdown';
import { setUser, socket } from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import {  useGetUserCartQuery} from '../store/cartApiSlice'
import { setCart, setFavorite } from '../store/offlineSlice';
import { useGetUserWishListQuery } from '../store/wishListApi';

const Header = memo(function Header ()  {
  const [show, setShow] = useState(false);
  const {cart} = useSelector((state) => state.offline);
  const [isLoggedIn, userInfo] = useLoggedIn();
  const {data} = useGetUserCartQuery(localStorage.getItem("cartID"));
  const {data:favData} = useGetUserWishListQuery()
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isLoggedIn){
      socket.connect();
      setUser(userInfo)
    }
    return ()=> {
      socket.disconnect();}
  }, [isLoggedIn]);

  useEffect(()=>{
    dispatch(setCart(data?.data))
  },[data]);

  useEffect(()=>{
    dispatch(setFavorite(favData))
  },[favData]);
  return (
    <>
    <Modal show={show} header="Search" setShow={setShow}>
      <SearchBox />
    </Modal>
    <header >
      <Disclosure as="nav" className="bd border-b ">
        <div className="md:mx-auto md:container">
          <div className="relative px-5 flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center gap-2">
              {/* <Disclosure>
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
              </Disclosure> */}
              <Link to="/">
                <div className="flex items-center">
                  <img
                    className="h-16  w-auto "
                    src="https://res.cloudinary.com/dfv2vlj7u/image/upload/v1708256865/logo.png"
                    alt="MHP"
                  />
                </div>
              </Link> 
            </div>
            <div 
              className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <div className='relative' >
                <input type="text" className='h-7 w-44' onClick={()=>setShow(true)} placeholder='Search..'/>
                <AiOutlineSearch className='absolute top-1 right-1 text-main w-5 h-5 hover:cursor-pointer'/>
              </div>
              <div className='h-10 w-[1px] bg-slate-900/10 dark:bg-slate-50/[0.06]  py-3'/>
              {/* {isLoggedIn && (<NotificationsPanel/>)} */}
              <ModeToggler/>
              <Link className='relative'  to={userInfo?`/profile/wishList`:'/auth'}>
                {favData?.data?.length > 0 && <span className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800'>{favData?.data?.length}</span> }
                <FaRegHeart className="h-7 w-7 text-main cursor-pointer hover:text-violet-600"/>
              </Link>
              <Link className='relative' to={cart?`/cart`:''}>
                {cart?.cartItems?.length > 0 && <span className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800'>{cart?.cartItems?.length}</span> }
                <AiOutlineShoppingCart className="h-7 w-7 text-main cursor-pointer hover:text-violet-600"/>
              </Link>
              {isLoggedIn?(
                <ProfileDropdown isLoggedIn={isLoggedIn} userInfo={ userInfo} />
              ): <Link to="/auth" className='text-main hover:text-blue-700'>Sign in</Link> }
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
    </>
  );

}) 

export default Header