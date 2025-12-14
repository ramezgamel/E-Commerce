import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../components/layout/SideBar';
import { useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import FullPageLoader from '../../components/FullPageLoader';
import { AnimatePresence, motion as m } from 'framer-motion';


function AdminLayout() {
  const { userInfo } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.role !== 'admin') {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <div className='h-[89vh] sm:flex'>
      <SideBar />
      <AnimatePresence>
        <Suspense fallback={<FullPageLoader />}>
          <m.main
            key={location.pathname.split("/admin")[1]}
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{
              y: 0, opacity: 1, transition: {
                duration: .3
              }
            }}
            exit={{
              y: "100vh", opacity: 0, transition: {
                duration: .2
              }
            }}
            className="flex-grow px-2 bg-gray-50 dark:bg-gray-800 my-2 mr-2 rounded-md overflow-hidden">
            <Outlet />
          </m.main>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default AdminLayout;
