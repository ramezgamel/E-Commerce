import Loader from '../../components/Loader';
import { FaEdit, FaTimes } from 'react-icons/fa';
import Paginate from '../../components/Paginate';
import { useState } from 'react';
import AdminSearchBox from '../../components/AdminSearchBox';
import { HiSwitchVertical } from 'react-icons/hi';
import { useEffect } from 'react';
import {
  useDeliverOrderMutation,
  useGetOrdersMutation,
} from '../../store/orderApiSlice';

function OrderList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('Default');
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const [orders, setOrders] = useState({});
  const [getOrders, { isLoading, error }] = useGetOrdersMutation();
  const [makeDelivered] = useDeliverOrderMutation();
  const markAsDelivered = async (id) => {
    await makeDelivered(id);
  };
  useEffect(() => {
    const getData = async () => {
      const orders = await getOrders({ keyword, page, sort, dec: toggle });
      setOrders(orders);
    };
    getData();
  }, [toggle, page, sort, keyword, getOrders]);

  return (
    <div className=" relative mx-3 mt-3 overflow-hidden bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
        <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
        <div className="flex  w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
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
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert" role="alert">
                {error.error || 'Something went wrong..!'}
              </div>
            ) : (
              <tbody>
                {orders?.data?.result.length > 0 &&
                  orders?.data?.result.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{order._id}</td>
                      <td className="p-2">{order.user.name}</td>
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
                            onClick={() => markAsDelivered(order._id)}
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
        </div>
        <div className="d-flex justify-content-center">
          <Paginate
            pages={orders?.data?.totalPages}
            pageNum={orders?.data?.page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderList;
