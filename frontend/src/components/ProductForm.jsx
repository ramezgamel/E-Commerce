/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCatsQuery } from '../store/catApiSlice';
function ProductForm({ submit, btnName, product }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const {data} = useGetCatsQuery()
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setPrice(product?.price);
      setBrand(product?.brand);
      setCategory(product?.category);
      setCountInStock(product?.countInStock);
      setDescription(product?.description);
      setImages(product?.images);
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
      images,
    };
    if (product) {
      newPrd._id = product._id;
      submit(newPrd);
    } else {
      submit(newPrd);
    }
    navigate('/admin/products');
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label className="text-main">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div>
          <label className="text-main">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>CountInStock:</label>
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className='w-[50%]'>
          <label>Category:</label>
          <select className='hover:cursor-pointer' name="category" onChange={(e)=>setCategory(e.target.value)}>
            {data?.result?.map(cat => <option key={cat._id} value={`${cat._id}`} >{cat.name}</option> )}
          </select>
        </div>
      </div>

      <div>
        <label>Images:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-2 text-right">
        <button type="submit" className="btn">
          {btnName}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
