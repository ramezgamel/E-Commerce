import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShop,
} from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
function AdminLayout() {
  return (
    <Row className="px-2">
      <Col md={2}>
        <aside>
          <LinkContainer to="/" style={{ cursor: "pointer" }}>
            <div className="my-5 text-center">
              <img src="../../../public/vite.svg" alt="" />
            </div>
          </LinkContainer>
          <Tab.Container>
            <ListGroup>
              <LinkContainer action to="/admin/dashboard">
                <ListGroup.Item className="d-flex align-items-center gap-2 py-3">
                  <MdOutlineSpaceDashboard />
                  <div>Dashboard</div>
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer action to="/admin/users">
                <ListGroup.Item className="d-flex align-items-center gap-2 py-3">
                  <AiOutlineUser />
                  <div>Users</div>
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer action to="/admin/orders">
                <ListGroup.Item className="d-flex align-items-center gap-2 py-3">
                  <AiOutlineShoppingCart />
                  <div>Orders</div>
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer action to="/admin/products">
                <ListGroup.Item className="d-flex align-items-center gap-2 py-3">
                  <AiOutlineShop />
                  <div>Products</div>
                </ListGroup.Item>
              </LinkContainer>
            </ListGroup>
          </Tab.Container>
        </aside>
      </Col>
      <Col md={10}>
        <header>Header</header>
        <Outlet />
        <main></main>
      </Col>
    </Row>
  );
}

export default AdminLayout;
