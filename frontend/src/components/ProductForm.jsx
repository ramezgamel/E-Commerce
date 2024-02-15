/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCatsQuery } from '../store/catApiSlice';
import { toast } from 'react-toastify';
import Progress from './Progress';
import useUpload from '../hooks/useUpload';
function ProductForm({ submit, btnName, product }) {
  const [category, setCategory] = useState();
  const nameInput = useRef();
  const priceInput = useRef();
  const countInStockInput = useRef();
  const descriptionInput = useRef();
  const brandInput = useRef();
  const {images, error:uploadErr, preview, progress, isUploaded, uploadData} = useUpload();
  const {data} = useGetCatsQuery()
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      nameInput.current.value = product.name
      priceInput.current.value = product.price
      brandInput.current.value = product.brand
      countInStockInput.current.value = product.countInStock
      descriptionInput.current.value = product.description
      setCategory(product?.category._id);
    }
  }, [product]);
  const submitHandler = (e) => {
    e.preventDefault();
    let newPrd = {
      name: nameInput.current.value,
      price: priceInput.current.value,
      brand:brandInput.current.value,
      category,
      countInStock:countInStockInput.current.value,
      description:descriptionInput.current.value,
      images: product?.images || images
    };
    if(category == "") return toast.error("Should select category");
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
          ref={nameInput}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div>
          <label className="text-main">Price:</label>
          <input
            type="number"
            ref={priceInput}
          />
        </div>
        <div>
          <label>CountInStock:</label>
          <input
            type="number"
            ref={countInStockInput}
          />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div>
          <label>Brand:</label>
          <input
            type="text"
            ref={brandInput}
          />
        </div>
        <div className='w-[50%]'>
          <label>Category:</label>
          <select className='hover:cursor-pointer' name="category" onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {data?.result?.map(cat => <option selected={cat._id == category} key={cat._id} value={cat._id} >{cat.name}</option> )}
          </select>
        </div>
      </div>
      <div>
        <label>Images:</label>
        {uploadErr ? <div className="error">{uploadErr.message}</div>: preview &&
            <div  className='my-2 grid grid-cols-5 gap-2 '>
            {preview.map(i=> <img key={i} className='h-20 w-full rounded-lg' src={i} />)}
            </div>
        }
        {(Boolean(progress) && !isUploaded) && <Progress progress={progress}/> }
        <input
          type="file"
          multiple
          onChange={(e)=> uploadData(e.target.files)}
        />
        
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          ref={descriptionInput}
        />
      </div>
      <div className="mt-2 text-right">
        <button type="submit" className="btn " disabled={!isUploaded && !product?.images}>
          {btnName}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
