import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function AdminLayout() {
  const {userInfo} = useSelector(state => state.auth);
  const navigate= useNavigate();
  useEffect(()=>{
    if(userInfo?.role !== 'admin'){
      navigate("/")
    }
  },[userInfo,navigate])
  return (
    <div className='grid grid-cols-12'>
      <div className='hidden sm:block sm:col-span-3 md:col-span-2'>
        <SideBar/>
      </div>
      <main className="max-h-screen mt-16 bg-slate-50 dark:bg-gray-800 col-span-12 sm:col-span-9 md:col-span-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
