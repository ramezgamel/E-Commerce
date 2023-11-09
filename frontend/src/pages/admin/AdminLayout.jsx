import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
// import AdminHeader from '../../components/AdminHeader';
// import Header from "../../components/Header"

function AdminLayout() {
  return (
    <div className='grid grid-cols-12'>
      <div className='hidden sm:block sm:col-span-3 md:col-span-2'>
        <SideBar/>
      </div>
      <main className="max-h-screen bg-slate-50 dark:bg-gray-800 col-span-12 sm:col-span-9 md:col-span-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
