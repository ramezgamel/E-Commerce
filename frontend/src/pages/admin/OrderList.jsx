import { FaEdit, FaTimes } from 'react-icons/fa';
import Paginate from '../../components/Paginate';
import { useState } from 'react';
import AdminSearchBox from '../../components/AdminSearchBox';
import { HiSwitchVertical } from 'react-icons/hi';
import {
  useDeliverOrderMutation,
  useGetOrdersQuery,
} from '../../store/orderApiSlice';
import { deliverOrder } from '../../socket';
import Table from '../../components/Table';
function OrderList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const { data: orders, isLoading, error } = useGetOrdersQuery({ page, sort, keyword, toggle });
  const [makeDelivered] = useDeliverOrderMutation();

  const markAsDelivered = async (id, userId) => {
    await makeDelivered(id);
    deliverOrder({
      receiver: userId,
      type: "Deliver",
      date: Date.now(),
      refId: id,
    });
  };
  return (
    <div className="px-3 mt-3 overflow-hidden h-full pb-4 no-scrollbar shadow-md bg-back">
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
        <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
        <div className="flex  w-full flex-shrink-0 gap-2 items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
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
            <option value="date">Date</option>
            <option value="paidAt">Paid</option>
            <option value="deliveredAt">Delivered</option>
            <option value="orderPrice">Total Price</option>
          </select>
          <HiSwitchVertical
            className="h-10 w-10 cursor-pointer text-main"
            onClick={() => setToggle((prev) => (prev == '+' ? '-' : '+'))}
          />
        </div>
      </div>
      <div className=" overflow-x-scroll no-scrollbar">
        <Table headers={['id', 'user', 'date', 'total', 'paid', 'delivered', 'actions']} isLoading={isLoading} error={error} >
          {orders?.data?.map((order) => (
            <tr
              key={order._id}
              className="border-b text-center dark:border-gray-700"
            >
              <td className="p-2">{order._id}</td>
              <td className="p-2">{order?.user.name}</td>
              <td className="p-2">
                {order.createdAt.substring(0, 10)}
              </td>
              <td className="p-2">{order.orderPrice}</td>
              <td className="p-2">
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <div className="flex justify-center">
                    <FaTimes className="text-red-500" />
                  </div>
                )}
              </td>
              <td className="p-2">
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <div className="flex justify-center">
                    <FaTimes className="text-red-500" />
                  </div>
                )}
              </td>
              <td className="my-auto place-items-center">
                <button
                  disabled={order.isDelivered}
                  onClick={() => markAsDelivered(order._id, order.user)}
                  className="rounded-md block bg-green-500 px-2 py-1 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-400"
                >
                  <FaEdit className='w-4 h-4 text-white' />
                </button>
              </td>
            </tr>
          ))}
        </Table>
        {orders?.paginationResult.totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <Paginate
              pages={orders?.paginationResult.totalPages}
              pageNum={orders?.paginationResult.currentPage}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderList;
