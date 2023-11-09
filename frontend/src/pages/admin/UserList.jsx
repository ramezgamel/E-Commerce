import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../store/userApiSlice';
import Paginate from '../../components/Paginate';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { HiSwitchVertical } from 'react-icons/hi';
import AdminSearchBox from '../../components/AdminSearchBox';
function UserList() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const [sort, setSort] = useState('');
  const {data:users, isLoading, isFetching, error} = useGetUsersQuery({ keyword, page, sort, dec: toggle });
  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl bg-gray-50 dark:bg-gray-800">
      <div className="relative mx-3 mt-3 overflow-hidden bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
          {/* ACTIONS PART */}
          <div className="flex  w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <div className="flex w-full flex-shrink-0 gap-2 items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <label htmlFor="sort" className="my-auto">
                Sort
              </label>
              <select
                value={sort}
                className="cursor-pointer px-2 py-1"
                name="sort"
                id="sort"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="name">Name</option>
                <option value="role">role</option>
                <option value="email">email</option>
              </select>
              <HiSwitchVertical
                className="h-10 w-10 cursor-pointer text-main"
                onClick={() => setToggle((prev) => (prev == '+' ? '-' : '+'))}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2">
                  ID
                </th>
                <th scope="col" className="p-2">
                  Name
                </th>
                <th scope="col" className="p-2">
                  Email
                </th>
                <th scope="col" className="p-2">
                  Admin
                </th>
                <th scope="col" className="p-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {error ? (
              <div role="info" className="alert">
                {error?.message || error?.error || 'Something went wrong'}
              </div>
            ) : ( 
              <tbody>
                {!isFetching && users?.result.map((user) => (
                  <tr key={user._id} className="border-b dark:border-gray-700">
                    <td className="p-2">{user._id}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="flex items-center justify-center gap-1">
                      <button className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400">
                        <FaEdit />
                      </button>
                      <button
                        className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {isLoading || isFetching ? (
            <div className="py-5 text-center">
              <Loader />
            </div>
          ) : (
            users?.result.length === 0 && (
              <div className="py-5 text-center">
                <strong className="text-main">Not Found</strong>
              </div>
            )
          )}
        </div>
        {users?.totalPages > 1 &&(
        <div className="d-flex justify-content-center">
          <Paginate
            pages={users?.totalPages}
            pageNum={users?.page}
            setPage={setPage}
          />
        </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
