import { Alert, Button, Table } from "react-bootstrap";
import { useGetOrdersQuery } from "../../store/orderApiSlice";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../../components/Paginate";
import { useState } from "react";

function OrderList() {
  const [page, setPage] = useState(1);
  const { data: orders, isLoading, error } = useGetOrdersQuery(page);

  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <>
          <Table striped bordered responsive hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.result.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order?.user?.name}</td>
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
                      <Button variant="light" className="btn-sm">
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
    </>
  );
}

export default OrderList;
