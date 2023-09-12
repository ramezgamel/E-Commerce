import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Col, Row } from "react-bootstrap";
function PlaceOrder() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}></Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}

export default PlaceOrder;
