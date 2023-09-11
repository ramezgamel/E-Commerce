import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";

function NewProduct() {
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitForm}>
      <FormGroup>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormControl type="text" name="name" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="category">Category:</FormLabel>
        <FormSelect name="category" required>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="description">Description:</FormLabel>
        <FormControl type="text" name="description" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="brand">Brand:</FormLabel>
        <FormControl type="text" name="brand" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="price">Price:</FormLabel>
        <FormControl type="number" name="price" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="countInStock">Count In Stock:</FormLabel>
        <FormControl type="number" name="countInStock" required />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="image">Image:</FormLabel>
        <FormControl type="file" name="image" />
      </FormGroup>
      <Button type="submit" className="my-2">
        Add
      </Button>
    </form>
  );
}

export default NewProduct;
