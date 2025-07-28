import { toast } from 'sonner';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../store/userApiSlice';
import Paginate from '../../components/Paginate';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import AdminSearchBox from '../../components/AdminSearchBox';
import Table from "../../components/Table";
import Sort from '../../components/Sort';


function UserList() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const [sort, setSort] = useState('');
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery({ keyword, page, sort, dec: toggle });
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
    <div className="max-w-screen-xl overflow-hidden h-full pb-4 no-scrollbar">
      <div className="relative mx-3 mt-3  bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
          <Sort sort={sort} setSort={setSort} setToggle={setToggle} values={['role', 'email', 'name']} />
        </div>
        {/* Table data */}
        <div className="overflow-x-auto no-scrollbar">
          <Table headers={['id', 'name', 'email', 'role', 'actions']} isLoading={isLoading} error={error}>
            {!isFetching && users?.data?.map((user) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="p-2">{user._id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="flex items-center justify-center p-2 gap-1">
                  <button
                    className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </Table>

        </div>
        {/* Pagination */}
        {users?.paginationResult.totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <Paginate
              pages={users?.paginationResult.totalPages}
              pageNum={users?.paginationResult.currentPage}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
