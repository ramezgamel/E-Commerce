function NewProduct() {
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select name="category" required>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" required />
      </div>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input type="text" name="brand" required />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" required />
      </div>
      <div>
        <label htmlFor="countInStock">Count In Stock:</label>
        <input type="number" name="countInStock" required />
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" />
      </div>
      <button type="submit" className="my-2 btn">
        Add
      </button>
    </form>
  );
}

export default NewProduct;
