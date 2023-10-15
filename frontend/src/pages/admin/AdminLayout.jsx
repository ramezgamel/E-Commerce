import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShop,
} from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import AdminHeader from '../../components/AdminHeader';

function AdminLayout() {
  return (
    <div className="grid grid-cols-12">
      <aside className="hidden h-screen border-r border-slate-900/10 bg-slate-50 dark:border-slate-50/[0.06] dark:bg-gray-900 md:col-span-2 md:block">
        <Link to="/" className="flex cursor-pointer justify-center p-4">
          <img src="../../../public/images/logo.png" alt="" />
        </Link>
        <ul className="flex flex-col border-gray-200 px-1 text-center font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
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
        </ul>
      </aside>
      <div className="col-span-12 max-h-screen overflow-y-auto bg-slate-50 dark:bg-gray-900 md:col-span-10">
        <header className="flex items-center justify-between gap-2 text-main">
          <div className="flex-grow">
            <AdminHeader />
          </div>
        </header>
        <main className="h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
