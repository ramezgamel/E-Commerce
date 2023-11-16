import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../store/userApiSlice';
import { setCredentials } from '../store/authSlice';
import { useGetMyOrdersQuery } from '../store/orderApiSlice';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import Paginate from '../components/Paginate';
function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [updateUser, { isLoading: loadingUser }] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useGetMyOrdersQuery(page);
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.email, userInfo.name]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const isMatch = password === confirmPassword;
    if (!isMatch) return toast.error("Passwords didn't match");
    try {
      let res;
      const updatedUser = {
        _id: userInfo._id,
        name,
        email,
        password,
      };
      if(image) {
        updatedUser.image = image;
        const formData = new FormData();
        Object.keys(updatedUser).map(key => formData.append(key, updatedUser[key]))
        res = await updateUser(formData).unwrap();
      }else {
        res = await updateUser(updatedUser).unwrap();
      }
      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  if (error)
    return (
      <div role="alert" className="alert">
        {error?.status == 401 ? 'Unauthorized' : 'Some thing went wrong'}
      </div>
    );
  return (
    <div className="grid-cols-12 gap-2 md:grid">
      <div className="col-span-4">
        <form onSubmit={submitHandler}>
          <div className="my-2">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Profile Image: </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="my-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Update
          </button>
          {loadingUser && <Loader />}
        </form>
      </div>
      <div className="col-span-8">
        <h2 className="my-2 text-main">My Orders</h2>
        {loadingOrders && <Loader />}
        {error && (
          <h3 role="alert" className="alert">
            {error}
          </h3>
        )}
        {orders?.result?.length == 0 ? (
          <div role="alert" className="alert">
            No Orders yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-2">
                    ID
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
              <tbody>
                {orders?.result?.map((order) => (
                  <tr key={order._id} className="border-b dark:border-gray-700">
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-2">{order.totalPrice}</td>
                    <td className="p-2">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className="p-2">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className="p-2">
                      <LinkContainer to={`/order/${order._id}`}>
                        <button className="btn">Details</button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center mt-2">
              <Paginate
                pages={orders?.totalPages}
                pageNum={orders?.page}
                setPage={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
