import { NavLink } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShop,
  AiFillBell
} from 'react-icons/ai';
import {CiDiscount1} from "react-icons/ci"
import {motion as m} from "framer-motion";
import { containerVariants,childVariants } from "../animation/variants";

// import { MdOutlineSpaceDashboard } from 'react-icons/md';
function SideBar() {
  return (
    <aside
      className="flex sm:block sm:w-40"
    >
      <h2 className="hidden sm:block text-main text-xl text-center py-5">Dashboard</h2>
      <m.ul 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex transition-all overflow-x-scroll no-scrollbar sm:flex-col gap-2 text-center sm:font-medium text-gray-500  dark:text-gray-400"
      >
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${isActive
                ? 'border-b-4 sm:border-b-0 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
            }
          >
            <div className="col-span-2">
              <AiOutlineUser />
            </div>
            <div className="col-span-10">Users</div>
          </NavLink>
        </m.li>
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${isActive
                ? 'border-b-4 sm:border-b-0 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
            }
          >
            <div className="col-span-2">
              <AiOutlineShoppingCart />
            </div>
            <div className="col-span-10">Orders</div>
          </NavLink>
        </m.li>
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${isActive
                ? 'border-b-4 sm:border-b-0 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
            }
          >
            <div className="col-span-2">
              <AiOutlineShop />
            </div>
            <div className="col-span-10">Products</div>
          </NavLink>
        </m.li>
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/notifications"
            className={({ isActive }) =>
              `${isActive
                ? 'xs:border-b-4 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 grid-cols-12`
            }
          >
            <div className="col-span-2">
              <AiFillBell />
            </div>
            <div className="col-span-10">Notifications</div>
          </NavLink>
        </m.li>
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `${isActive
                ? 'xs:border-b-4 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
            }
          >
            <div className="col-span-2">
              <AiFillBell />
            </div>
            <div className="col-span-10">Categories</div>
          </NavLink>
        </m.li>
        <m.li variants={childVariants}>
          <NavLink
            to="/admin/coupons"
            className={({ isActive }) =>
              `${isActive
                ? 'xs:border-b-4 sm:border-l-4 border-blue-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 '
                : ''
              } flex items-center gap-2 p-3 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`
            }
          >
            <div className="col-span-2">
              <CiDiscount1 />
            </div>
            <div className="col-span-10">Coupons</div>
          </NavLink>
        </m.li>
      </m.ul>
    </aside>
  );
}

export default SideBar;
