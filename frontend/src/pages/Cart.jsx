import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Alert,
  FormControl,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../store/cartSlice";
import { LinkContainer } from "react-router-bootstrap";
function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const updateCart = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length == 0 ? (
          <Alert variant="info">
            Cart is Empty
            <Link to="/"> Go Back</Link>
          </Alert>
        ) : (
          // variant="flush"
          <ListGroup>
            {cartItems.map((i) => (
              <ListGroup.Item key={i?._id}>
                <Row>
                  <Col md={2}>
                    <Image src={i?.image} alt={i?.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${i?._id}`}>{i?.name}</Link>
                  </Col>
                  <Col md={2}>${i?.price}</Col>
                  <Col md={2}>
                    <FormControl
                      defaultValue={i?.qty}
                      type="number"
                      onChange={(e) => updateCart(i, Number(e.target.value))}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleDelete(i?._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, i) => acc + +i?.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item?.qty * item?.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/shipping">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default Cart;
