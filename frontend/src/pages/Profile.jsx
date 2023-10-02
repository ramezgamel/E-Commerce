import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../store/userApiSlice";
import { setCredentials } from "../store/authSlice";
import { useGetMyOrdersQuery } from "../store/orderApiSlice";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../components/Paginate";
function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const updatedUser = {
        _id: userInfo._id,
        name,
        email,
        password,
      };
      const res = await updateUser(updatedUser).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  if (error)
    return (
      <Alert variant="danger">
        {error?.status == 401 ? "Unauthorized" : "Some thing went wrong"}
      </Alert>
    );
  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name" className="my-2">
            <FormLabel>Name:</FormLabel>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email" className="my-2">
            <FormLabel>Email: </FormLabel>
            <FormControl
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" className="my-2">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" className="my-2">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <Button type="submit">Update</Button>
          {loadingUser && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders && <Loader />}
        {error && <Alert variant="danger">{error}</Alert>}
        {orders?.result?.length == 0 ? (
          <Alert variant="info">No Orders yet</Alert>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.result?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Paginate
                pages={orders?.totalPages}
                pageNum={orders?.page}
                setPage={setPage}
              />
            </div>
          </>
        )}
      </Col>
    </Row>
  );
}

export default Profile;
