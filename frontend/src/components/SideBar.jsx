import { NavLink, Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShop,
  AiFillBell
} from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
function SideBar() {
  return (
    <aside className="border-r pr-4 h-screen border-slate-900/10 bg-slate-50 dark:border-slate-50/[0.06] dark:bg-gray-800 rounded-lg">
        <div className="mx-auto items-center flex justify-center">
        <Link to="/" className="cursor-pointer justify-center p-4">
          <img className="w-16 h-10" src="../../../public/images/logo.png" alt="" />
        </Link>
        </div>
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
          <li>
            <NavLink
              to="/admin/notifications"
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                    : ''
                } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
              }
            >
              <AiFillBell />
              <div>Notifications</div>
            </NavLink>
          </li>
        </ul>
    </aside>
  )
}

export default SideBar
