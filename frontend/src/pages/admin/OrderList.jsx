import Loader from '../../components/Loader';
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

function OrderList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  // const [orders, setOrders] = useState({});
  const {data:orders, isLoading, isFetching, error} = useGetOrdersQuery({page, sort, keyword, toggle});
  const [makeDelivered] = useDeliverOrderMutation();
  const markAsDelivered = async (id, userId) => {
    await makeDelivered(id);
    deliverOrder({
      receiver: userId, 
      type:"Deliver",
      date: Date.now(),
      refId:id,
    })
  };

  return (
    <div className="px-3 mt-3 overflow-hidden bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
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
            <option value="totalPrice">Total Price</option>
          </select>
          <HiSwitchVertical
            className="h-10 w-10 cursor-pointer text-main"
            onClick={() => setToggle((prev) => (prev == '+' ? '-' : '+'))}
          />
        </div>
      </div>
      <div className=" flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2">
                  ID
                </th>
                <th scope="col" className="p-2">
                  User
                </th>
                <th scope="col" className="p-2">
                  Date
                </th>
                <th scope="col" className="p-2">
                  Total
                </th>
                <th scope="col" className="p-2">
                  Paid
                </th>
                <th scope="col" className="p-2">
                  Delivered
                </th>
                <th scope="col" className="p-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {error ? (
              <div className="alert" role="alert">
                {error.error || 'Something went wrong..!'}
              </div>
            ) : (
              <tbody>
                {!isFetching &&
                  orders?.result?.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{order._id}</td>
                      <td className="p-2">{order?.user?.name}</td>
                      <td className="p-2">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-2">{order.totalPrice}</td>
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
                      <td className="my-auto pr-2">
                        {!order.isDelivered && (
                          <button
                            onClick={() => markAsDelivered(order._id, order.user._id)}
                            className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                          >
                            <FaEdit />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          {isLoading ? (
            <div className="py-5 text-center">
              <Loader />
            </div>
          ) : (
            orders?.data?.result.length === 0 && (
              <div className="py-5 text-center">
                <strong className="text-main">Not Found</strong>
              </div>
            )
          )}
        </div>
        {orders?.totalPages > 1 &&(
          <div className="d-flex justify-content-center">
            <Paginate
              pages={orders?.totalPages}
              pageNum={orders?.page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderList;
