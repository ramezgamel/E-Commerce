// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useGetProductsFeaturesMutation } from "../store/productsApiSlice";
import { LinkContainer } from "react-router-bootstrap";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [searchProducts, { data }] = useGetProductsFeaturesMutation();
  const onSearch = (e) => {
    setKeyword(e.target.value);
    searchProducts(keyword);
  };
  return (
    <>
      <Form className="position-relative">
        <Form.Control
          type="text"
          name="q"
          onChange={onSearch}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        {data?.result.length > 0 && keyword != "" && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,.7)",
              zIndex: 500,
              overflow: "scroll",
              height: "400px",
            }}
            className="position-absolute w-100"
          >
            {data?.result.length > 0 &&
              data?.result?.map((item) => (
                <LinkContainer
                  key={item._id}
                  to={`/product/${item._id}`}
                  onClick={() => setKeyword("")}
                >
                  <Row className="p-2">
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={9}>
                      <p style={{ color: "white" }}>{item.name.slice(0, 30)}</p>
                    </Col>
                  </Row>
                </LinkContainer>
              ))}
          </div>
        )}
      </Form>
    </>
  );
}

export default SearchBox;
