import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductByIdQuery } from "../store/productsApiSlice";
import Loader from "../components/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
function ProductDetails() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const addQty = (e) => {
    if (e.target.value > product?.countInStock)
      return toast.warn("Out of stock");
    setQty(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };
  if (isLoading) return <Loader />;
  if (isError) return <h1>Error: {isError.message}</h1>;
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Price:</strong> ${product?.price}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Description:</strong> {product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    {" "}
                    <strong>${product?.price}</strong>{" "}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {" "}
                    <strong>
                      {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>{" "}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <FormControl
                        value={qty}
                        type="number"
                        onChange={addQty}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetails;
