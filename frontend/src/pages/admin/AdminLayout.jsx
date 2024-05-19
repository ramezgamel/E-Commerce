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
    <div className='h-[calc(100vh - 100px)] sm:flex'>
      <SideBar/>
      <main className="flex-grow px-2 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
