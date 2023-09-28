import { Row, Col, Alert } from "react-bootstrap";
import { useGetProductQuery } from "../store/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "./ProductCarousel";
import { useState } from "react";
function Home() {
  const [page, setPage] = useState(1);
  const { data: products, isLoading, error } = useGetProductQuery(page);
  if (isLoading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <>
      <ProductCarousel />
      <h1>Latest Products</h1>
      <Row>
        {products?.result?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <div className="text-center">
        {products?.result.length && (
          <div className="d-flex justify-content-center">
            <Paginate
              pages={products?.totalPages}
              pageNum={products?.page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
