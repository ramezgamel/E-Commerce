import { Alert, Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../store/userApiSlice";
import Paginate from "../../components/Paginate";
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
function UserList() {
  const [page, setPage] = useState(1);
  const { data: users, isLoading, error } = useGetUsersQuery(page);
  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h2>Users</h2>
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
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users?.result.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaCheck style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="d-flex justify-content-between">
                    <Button variant="primary" className="btn-sm">
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Paginate
              pages={users?.totalPages}
              pageNum={users?.page}
              setPage={setPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default UserList;
