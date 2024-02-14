/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import {  memo, useEffect, useState } from 'react';
import { Disclosure, } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch} from 'react-icons/ai';
import Modal from "../components/Modal"
import SideBar from './SideBar';  
import useLoggedIn from '../hooks/useLoggedIn';
import ModeToggler from './ModeToggler';
import CartPanel from './CartPanel';
import NotificationsPanel from './NotificationsPanel';
import ProfileDropdown from './ProfileDropdown';
import { setUser, socket } from '../socket';


const Header = memo(function Header ()  {
  const [show, setShow] = useState(false)
  const [isLoggedIn, userInfo] = useLoggedIn();
  useEffect(()=>{
    if(isLoggedIn){
      socket.connect();
      setUser(userInfo)
    }
    return ()=> {
      socket.disconnect();}
  }, [isLoggedIn])
  
  return (
    <>
    <Modal show={show} header="Search" setShow={setShow}>
      <SearchBox />
    </Modal>
    <header className="sticky top-0 z-50">
      <Disclosure as="nav" className="bd border-b bg-slate-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center gap-2">
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
              <Link to="/">
                <div className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="../../public/images/logo.png"
                    alt="MHP"
                  />
                </div>
              </Link> 
            </div>
            <div 
              className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <div className='relative' >
                <input type="text" className='h-7' onClick={()=>setShow(true)} placeholder='Search..'/>
                <AiOutlineSearch className='absolute top-1 right-1 text-main w-5 h-5 hover:cursor-pointer'/>
              </div>
              <div className='h-10 w-[1px] bg-slate-900/10 dark:bg-slate-50/[0.06]  py-3'/>
              {isLoggedIn && (<NotificationsPanel/>)}
              <ModeToggler/>
              <CartPanel/>
              {isLoggedIn?(
                <ProfileDropdown isLoggedIn={isLoggedIn} userInfo={ userInfo} />
              ): <Link to="/login" className='text-main'>Sign in</Link> }
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
    </>
  );
}) 

export default Header