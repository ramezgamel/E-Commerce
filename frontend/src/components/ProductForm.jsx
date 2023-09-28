/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ProductForm({ submit, btnName, product }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setPrice(product?.price);
      setBrand(product?.brand);
      setCategory(product?.category);
      setCountInStock(product?.countInStock);
      setDescription(product?.description);
      setImage(product?.image);
    }
  }, [product]);
  const submitHandler = (e) => {
    e.preventDefault();
    let newPrd = {
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      image,
    };
    if (product) {
      newPrd._id = product._id;
      submit(newPrd._id, newPrd);
    } else {
      submit(newPrd);
    }
    navigate("/admin/products");
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup controlId="name">
        <FormLabel>Name:</FormLabel>
        <FormControl
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="price">
        <FormLabel>Price:</FormLabel>
        <FormControl
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="brand">
        <FormLabel>Brand:</FormLabel>
        <FormControl
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="category">
        <FormLabel>Category:</FormLabel>
        <FormControl
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="countInStock">
        <FormLabel>CountInStock:</FormLabel>
        <FormControl
          type="number"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="countInStock">
        <FormLabel>Image:</FormLabel>
        <FormControl
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </FormGroup>
      <FormGroup controlId="description">
        <FormLabel>Description:</FormLabel>
        <FormControl
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      {
        <Button type="submit" variant="primary" className="my-2">
          {btnName}
        </Button>
      }
    </Form>
  );
}

export default ProductForm;
