import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import {
  useGetProductByIdQuery,
} from '../store/productsApiSlice';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import { useAddToCartMutation } from "../store/cartApiSlice.js";
import NavAnimation from '../animation/NavAnimation';
import Reviews from '../components/Reviews.jsx';

function ProductDetails() {
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id);
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    setMainImage(product?.data?.images[0]);
  }, [product?.data]);

  const changeQtyHandler = async (e, product) => {
    const quantity = e.target.value;
    if (quantity > product.countInStock) return toast.error("Out of stock");
    if (quantity <= 0) return toast.error('Invalid quantity value');
    try {
      const cartId = localStorage.getItem("cartID");
      if (cartId) {
        await addToCart({ productId: product._id, cartId }).unwrap();
      } else {
        const res = await addToCart({ productId: product._id }).unwrap();
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err);
    }
  };

  const addToCartHandler = async () => {
    try {
      const cartId = localStorage.getItem("cartID");
      if (cartId) {
        await addToCart({ productId: product._id, cartId }).unwrap();
      } else {
        const res = await addToCart({ productId: product._id }).unwrap();
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err);
    }
  };



  if (isLoading) return <div className='h-full my-auto text-center'>
    <Loader />
  </div>;

  if (error) return <div className="alert">Error: {error.message || "Something went wrong"}</div>;

  return (
    <NavAnimation>
      {product.data && <>
        <Meta title={product?.data.name} />
        <div className="md:container md:mx-auto mt-4">
          <div className="gap-2 md:grid md:grid-cols-12 max-h-[80vh]">
            <div className="flex gap-1 md:col-span-5 max-h-[80vh] ">
              <div className="bd relative w-[20%] gap-1 overflow-auto no-scrollbar">
                {product?.data.images.map((image) => (
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
                <h3 className="text-main">{product?.data?.name}</h3>
                <Rating
                  value={product?.data?.rating}
                  text={`${product?.data?.numReviews} reviews`}
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
              <div className="flex items-center mt-3 justify-between md:px-10">
                {product?.data?.countInStock > 0 ? (
                  <>
                    <input
                      className="w-14 py-2"
                      placeholder='1'
                      type="number"
                      onChange={(e) => changeQtyHandler(e, product?.data)}
                    />
                    <button
                      className="btn w-100"
                      type="button"
                      disabled={product?.data?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </>
                ) : <p className='text-red-500 text-2xl'>Out of Stock</p>}
              </div>
            </div>
          </div>
          <hr className='my-3' />
          <Reviews product={product.data}/>
        </div>
      </>
      }
    </NavAnimation>
  );
}

export default ProductDetails;
