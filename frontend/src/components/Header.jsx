/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Disclosure, } from '@headlessui/react';

import { useVerifyTokenQuery } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import SearchBox from './SearchBox';
import ModeToggler from './ModeToggler';
import CartPanel from './CartPanel';
import FavoritePanel from './FavoritePanel';
import NotificationsPanel from './NotificationsPanel';
import ProfileDropdown from './ProfileDropdown';

function Header ()  {
  const {userInfo} = useSelector(state => state.auth)
  const {cartID} = useSelector(state => state.offline)
  const {data:user, isLoading:verifyTokenLoader} = useVerifyTokenQuery();
  const dispatch = useDispatch();

  
  useEffect(()=> {
    if(!verifyTokenLoader && user) {
      dispatch(setCredentials(user))
    }
  },[user, verifyTokenLoader]);
  
  return (
    <>
    <header >
      <Disclosure as="nav" className="bd border-b ">
        <div className="md:mx-auto md:container">
          <div className="relative px-5 flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center gap-2">
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
              <SearchBox/>
              <div className='h-10 w-[1px] bg-slate-900/10 dark:bg-slate-50/[0.06]  py-3'/>
              {userInfo && <>
                <NotificationsPanel/>
                {userInfo.role != "admin" && <FavoritePanel/>}
              </> }
              {cartID && userInfo?.role != "admin" &&
                <CartPanel cartID={cartID}/>
              }
              <ModeToggler/>
              {userInfo?(
                <ProfileDropdown userInfo={ userInfo} />
              ): <Link to="/auth" className='text-main hover:text-blue-700'>Sign in</Link> }
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
    </>
  );
}

export default Header