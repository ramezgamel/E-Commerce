import { Link, useParams } from 'react-router-dom';
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
} from '../store/orderApiSlice';
import Loader from '../components/Loader';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {paymentSuccess} from "../socket";
import { useEffect, useState } from 'react';
function Order() {
  const { id: orderId } = useParams();  
  const {
    data,
    error,
    isLoading,
    isError,  
    refetch,
  } = useGetOrderByIdQuery(orderId);   
  const [order, setOrder] = useState({})
  const [{ isPending }] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();  
  useEffect(()=> {
    if(!isLoading && data){
      setOrder(data)
    }
  },[data, isLoading]);
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        const notification = {
          userInfo: userInfo, 
          type:"payment success",
          date: Date.now(),
          refId:orderId,
        }
        paymentSuccess(notification)
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };
  const createOrder = (data, actions) => {
    console.log(actions.order)
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { 
              value: order.totalPrice 
            }
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      })
  };  
  const onError = (err) => {
    toast.error(err.message);
  };
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      deliverOrder({
      receiver: order.user._id, 
      type:"Deliver",
      date: Date.now(),
      refId:orderId,
    })
      toast.success('Order is delivered');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };    
  if (isLoading) return <Loader />; 
  if (isError) return <div className="alert">{error.data.message || "Something went wrong"}</div>;
  return (
    <div> 
      <h1 className="text-main">Order {order?._id}</h1>
      <div className="grid grid-cols-12">
        {/* // div className="grid grid-cols-12" */}
        <div className="col-span-8">
          <div className="mb-2 p-2 text-main shadow-md">
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {order?.user?.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order?.user?.email}
            </p>
            <p>
              <strong>Address: </strong>
              {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{' '}
              {order?.shippingAddress?.postalCode},{' '}
              {order?.shippingAddress?.country}
            </p>
            {order?.isDelivered ? (
              <div className="success">Delivered on {order?.deliveredAt}</div>
            ) : (
              <>
                <div role="alert" className="alert">
                  Not Delivered
                </div>
                {userInfo.role === 'admin' && order?.isPaid && (
                  <button
                    disabled={loadingDeliver}
                    className="btn"
                    onClick={deliverHandler}
                  >
                    {loadingDeliver ? <Loader /> : 'Deliver Order'}
                  </button>
                )}
              </>
            )}
          </div>
          <div className="mb-2 p-2 text-main shadow-md">
            <h2>Payment Method</h2>
            <p>
              <strong>Method</strong> {order?.paymentMethod}
            </p>
            {order?.isPaid ? (
              <div className="success">Paid on {order?.paidAt.slice(0, 10)}</div>
            ) : (
              <div className="alert">Not Paid</div>
            )}
          </div>
          <div className="mb-2 p-2 text-main shadow-md">
            <h2 className="text-main">Order Items</h2>
            {order?.orderItems?.map((item) => (
              <div className="grid-cols-12 gap-2 md:grid" key={item._id}>
                <div className="col-span-2">
                  <img
                    className="rounded-md max-w-full"
                    src={item.images[0]}
                    alt={item.name}
                  />
                </div>
                <div className="col-span-6 text-main">
                  <Link to={`/products/${item._id}`}>{item.name}</Link>
                </div>
                <div className="col-span-4 my-auto">
                  {item.qty} x {item.price} = {item.qty * item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-1 text-main shadow-md">
            <h2>Order Summary</h2>
            <div className="flex justify-between">
              <strong>Items :</strong>
              <p>{order?.itemsPrice}</p>
            </div>
            <div className="flex justify-between">
              <strong>Shipping :</strong>
              <p>{order?.shippingPrice}</p>
            </div>
            <div className="flex justify-between">
              <strong>Tax :</strong>
              <p>{order?.taxPrice}</p>
            </div>
            <div className="bd flex justify-between border-t">
              <strong className="my-auto py-2">Total :</strong>
              <p className="my-auto py-2">{order?.totalPrice}</p>
            </div>
            {/* mark as paid and deliverd  */}
            {!order?.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
