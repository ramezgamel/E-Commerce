import { useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
} from '../store/productsApiSlice';
import Loader from '../components/common/Loader';
import { useEffect, useState } from 'react';
import Meta from '../components/layout/Meta';
import NavAnimation from '../animation/NavAnimation';
import Reviews from '../components/Reviews.jsx';
import InputCountToCartButton from '../components/buttons/InputCountToCartButton.jsx';
import Error from '../components/common/Error.jsx';
import Rating from '../components/Rating.jsx';

function ProductDetails() {
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id);

  useEffect(() => {
    setMainImage(product?.data?.images[0]);
  }, [product?.data]);



  if (isLoading) return <div className='h-full my-auto text-center'>
    <Loader />
  </div>;

  if (error) return <Error errMsg={error.message} />;
  // <div className="alert">Error: {error.message || "Something went wrong"}</div>;

  return (
    <NavAnimation>
      <Meta title={product?.data.name} />
      <div className="md:w-[85vw] md:mx-auto mt-4">
        <div className="gap-2 md:grid md:grid-cols-12 ">
          <div className="flex gap-1 md:col-span-5 max-h-[80vh] ">
            <div className="bd relative w-[20%] gap-1 overflow-auto no-scrollbar">
              {product?.data.images?.map((image) => (
                <div
                  key={image}
                  className="bd h-[20%] mb-1 cursor-pointer bg-white rounded-md border  text-main hover:opacity-30"
                >
                  <img
                    className="mb-2 h-full w-full object-contain"
                    src={image}
                    alt={product?.data.name}
                    onClick={() => setMainImage(image)}
                  />
                </div>
              ))}
            </div>
            <div className="w-[80%] bg-white">
              <img
                className="text-main h-full w-full object-contain"
                src={mainImage}
                alt={product?.data.name}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="border-b border-slate-900/10 py-1 dark:border-slate-50/[0.06]">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{product?.data?.name}</h3>
              <Rating
                value={product?.data?.rating}
                count={product?.data?.numReviews}
              />
            </div>
            <div className="border-b border-slate-900/10 py-1 dark:border-slate-50/[0.06]">
              <p className="text-main flex justify-between">
                <strong>Price:</strong>EGP {product?.data?.price}
              </p>
              <p className="text-main flex justify-between">
                <strong>Brand:</strong> {product?.data?.brand}
              </p>
              <p className="text-main flex justify-between">
                <strong>Category:</strong> {product?.data?.category?.name}
              </p>
            </div>
            <p className="text-main line-clamp-[11]">
              <strong>Description:</strong> {product?.data?.description}
            </p>
            {product?.data?.countInStock > 0 ?
              <InputCountToCartButton productId={product.data._id} countInStock={product.data.countInStock} />
              : <p className='text-red-500 text-2xl'>Out of Stock</p>}
          </div>
        </div>
        <hr className='my-3' />
        <Reviews product={product.data} />
      </div>
    </NavAnimation>
  );
}

export default ProductDetails;

