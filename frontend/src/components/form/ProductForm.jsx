import { useNavigate } from 'react-router-dom';
import { useGetCatsQuery } from '../../store/catApiSlice';
import { toast } from 'sonner';
import Progress from '../Progress';
import useUploadImages from '../../hooks/useUploadImages';

function ProductForm({ submit, btnName, product }) {
  const { data } = useGetCatsQuery();
  const navigate = useNavigate();
  const { images,
    handleImageChange,
    handleUpload,
    isUploading,
    uploadResponse,
    error: uploadErr,
    progress } = useUploadImages();


  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.category?.value == "") return toast.error("Should select category");
    let newPrd = {
      images: uploadResponse || product?.images,
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      countInStock: e.target.countInStock.value,
      brand: e.target.brand.value,
      category: e.target.category.value,
    };
    if (product) newPrd._id = product._id;
    submit(newPrd);

    navigate('/admin/products');
  };

  return (
    <form onSubmit={submitHandler}>
      <FormInput label='Name: ' name='name' value={product && product?.name} />
      <div className="mt-2 grid grid-cols-2 gap-2">
        <FormInput label='Price: ' name='price' value={product && product?.price} type="number" />
        <FormInput label='CountInStock : ' name='countInStock' value={product && product?.countInStock} type="number" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <FormInput label='Brand : ' name="brand" value={product && product?.brand} />
        <div >
          <label>Category:</label>
          <select className='hover:cursor-pointer' defaultValue={product?.category?._id} name="category" >
            <option >Select Category</option>
            {data?.data.length > 1 && data?.data.map(cat =>
              <option key={cat._id} value={cat._id} >
                {cat.name}
              </option>)}
          </select>
        </div>
      </div>
      <div>
        <label>Images:</label>
        {isUploading && <Progress progress={progress} />}
        {uploadErr?.error ? <div className="alert px-3 my-2">{uploadErr.error}</div> : images &&
          <div className='my-2 grid grid-cols-5 gap-2 '>
            {images.map(i => <img key={i} className='h-20 w-full rounded-lg' src={i} />)}
          </div>
        }
        {
          images.length == 0 ? <input
            type="file"
            multiple
            onChange={handleImageChange}
          /> : !uploadResponse && <div className="text-right">
            <button disabled={isUploading} type="button" onClick={handleUpload} className='bg-blue-700 px-4 py-1 rounded-md '>Save</button>
          </div>
        }
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          name='description'
          defaultValue={product && product.description}
        />
      </div>
      <div className="mt-2 text-right">
        <button type="submit" className="btn " disabled={isUploading && !product?.images || uploadErr?.error}>
          {btnName}
        </button>
      </div>
    </form>
  );
}

const FormInput = ({ label, name, type = 'text', value }) => {
  return <div>
    <label>{label}</label>
    <input
      name={name}
      type={type}
      defaultValue={value}
    />
  </div>;
};
export default ProductForm;
