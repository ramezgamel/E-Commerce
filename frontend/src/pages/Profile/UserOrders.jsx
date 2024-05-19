import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../store/orderApiSlice";
import Loader from "../../components/Loader";

function UserOrders() {
  const {data:orders, isLoading, isError} = useGetMyOrdersQuery();
  if(isError) return <div className="alert text-center my-10 py-2">Failed to get orders</div>
  if(isLoading) return <Loader/>
  return (
    <table className="w-full">
      <thead className="table-header-group border-b h-10">
        <tr >
          <th>Date</th>
          <th>Total</th>
          <th>Is Delivered</th>
          <th>Is Paid</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders?.data.map(order=>
        <tr className="table-row text-center h-8 border-b" key={order._id}> 
          <td>{new Date(order.createdAt).toLocaleDateString("en-EG")}</td>
          <td>{order.orderPrice} EGP</td>
          <td>{order.isDelivered ? "Delivered": "No"} </td>
          <td>{order.isPaid ? "Paid": "No"} </td>
          <td>
            <Link className="text-blue-600 !underline" to={`/order/${order._id}`}>Go</Link>
          </td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default UserOrders
