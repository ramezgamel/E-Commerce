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
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from "../store/productsApiSlice";
import Loader from "../components/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Meta from "../components/Meta";
function ProductDetails() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReview }] = useAddReviewMutation();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductByIdQuery(id);
  const addQty = (e) => {
    if (e.target.value > product?.countInStock)
      return toast.warn("Out of stock");
    setQty(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  if (isLoading) return <Loader />;
  if (isError) return <h1>Error: {isError.message}</h1>;
  return (
    <>
      <Meta title={product.name} />
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
      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && (
            <Alert variant="danger">No Reviews</Alert>
          )}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a review</h2>
              {loadingReview && <Loader />}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - VeryGood</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingReview}
                    type="submit"
                    variant="primary"
                    className="mt-2"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Alert variant="danger">Please Login to review</Alert>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetails;
