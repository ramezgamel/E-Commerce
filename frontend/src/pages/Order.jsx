import { Link, useParams } from 'react-router-dom';
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
} from '../store/orderApiSlice';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

function Order() {
  const { id: orderId } = useParams();
  const {
    data: order,
    error,
    isLoading:loadingOrder,
    isError,
    refetch,
  } = useGetOrderByIdQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);
  // const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId)
      // deliverOrder({
      //   receiver: order.user._id,
      //   type: "Deliver",
      //   date: Date.now(),
      //   refId: orderId,
      // });
      toast.success('Order is delivered');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  if (loadingOrder) return <Loader />;
  if (isError) return <div className="alert">{error.data.message || "Something went wrong"}</div>;
  return (
    <div className='min-h-[70vh] md:mx-20'>
      <h1 className="text-main text-3xl font-extrabold text-center mb-3">Order {order?._id}</h1>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8">
          <div className="mb-2 p-2 text-main">
            <h2 className="text-main font-bold text-xl border-b pb-2">Order Items</h2>
            <div className='mt-4'>
              {order?.data.cartItems.map((item) => (
                <div className="grid grid-cols-12 my-2 bg-back p-1 rounded-md gap-2 md:grid" key={item.product._id}>
                  <div className='col-span-2'>
                    <img src={item.product.images[0]} alt="" />
                  </div>
                  <div className="col-span-6 text-main">
                    <Link className='hover:text-blue-600' to={`/products/${item.product._id}`}>{item.product.name}</Link>
                  </div>
                  <div className="col-span-4 my-auto">
                    {item.quantity} x {item.price} = {item.quantity * item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-2 text-main bg-back rounded-md shadow-md">
            <h2 className='text-xl font-bold text-center my-3'>Order Details</h2>
            <div className="">
            <p>
              <strong>Name: </strong> {order.data.user.name}
            </p>
            <p>
              <strong>Address: </strong> {order?.data.shippingAddress.alias}{' '}
              {order?.data?.shippingAddress?.details}
            </p>
            <p > <strong>Payment Method</strong> {order?.data.paymentMethod}</p>
            <div className="mb-2 p-2 text-main shadow-md">
              <div className="mb-2">
                {order?.data?.isDelivered ? (
                  <div className="bg-green-600 rounded-md text-center py-2">Delivered on {format(Date(order?.data.deliveredAt), 'dd/MM/yyy h:m:s',{timeZone:""})}</div>
                ) : (
                  <div className="flex">
                    <div className="bg-red-600 flex-grow rounded-l-md text-center py-2">
                      Not Delivered
                    </div>
                    {userInfo.role === 'admin' && !order?.data.isPaid && (
                      <button
                        disabled={loadingDeliver}
                        className="bg-blue-700 px-1 rounded-r-md"
                        onClick={deliverHandler}
                      >
                        {loadingDeliver ? <Loader /> : 'Del'}
                      </button>
                    )}
                  </div>
                )}
                </div>
              {order?.data.isPaid ? (
                <div className='bg-green-600 rounded-md text-center py-2'>Paid on {order?.data.paidAt.slice(0, 10)}</div>
              ) : (
                <div className='bg-red-600 rounded-md text-center py-2'>Not Paid</div>
              )}
            </div>
          </div>
          <hr />
            <h2 className='text-xl font-bold text-center my-3'>Order Summary</h2>
            <div className="flex justify-between">
              <strong>Items :</strong>
              <p>{order?.data.cartItems.reduce((acc, curr) => acc = acc + curr.price, 0)}</p>
            </div>
            <div className="flex justify-between">
              <strong>Shipping :</strong>
              <p>{order?.data.shipping == 0 ? "Free" : order?.data.shipping}</p>
            </div>
            <div className="flex justify-between">
              <strong>Tax :</strong>
              <p>{order?.data.tax}</p>
            </div>
            <div className="bd flex justify-between border-t">
              <strong className="my-auto py-2">Total :</strong>
              <p className="my-auto py-2">{order?.data.orderPrice}</p>
            </div>
            {/* mark as paid and deliverd  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
