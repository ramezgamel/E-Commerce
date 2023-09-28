import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../store/productsApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import Paginate from "../../components/Paginate";
import Model from "../../components/Modal";
import ProductForm from "../../components/ProductForm";
function ProductList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const { data: products, isLoading, error } = useGetProductQuery(page);
  const [deletePrd] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const deleteProduct = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        await deletePrd(id);
        toast.success("Product Deleted");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleCreate = async (newPrd) => {
    try {
      const formData = new FormData();
      Object.keys(newPrd).map((key) => {
        formData.append(key, newPrd[key]);
      });
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  return (
    <>
      <Model
        show={show}
        handleClose={() => setShow(false)}
        header="Create Product"
      >
        {loadingCreate ? (
          <Loader />
        ) : (
          <ProductForm btnName="Create" submit={handleCreate} />
        )}
      </Model>
      <Row>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button className="text-end" onClick={() => setShow(true)}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <>
          <Table striped bordered responsive hover className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Category</td>
                <td>Brand</td>
              </tr>
            </thead>
            <tbody>
              {products?.result.map((prd) => (
                <tr key={prd._id}>
                  <td>{prd._id}</td>
                  <td>{prd.name}</td>
                  <td>{prd.price}</td>
                  <td>{prd.category}</td>
                  <td>{prd.brand}</td>
                  <td className="d-flex ">
                    <LinkContainer to={`/admin/product/${prd._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProduct(prd._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Paginate
              pages={products?.totalPages}
              pageNum={products?.page}
              setPage={setPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;
