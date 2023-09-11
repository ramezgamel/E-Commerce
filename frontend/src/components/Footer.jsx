import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; 2023</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
