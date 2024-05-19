import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from '../store/productsApiSlice';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Meta from '../components/Meta';
import {useAddToCartMutation} from "../store/cartApiSlice"
import NavAnimation from '../animation/NavAnimation';
import { format } from 'date-fns';
function ProductDetails() {
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReview }] = useAddReviewMutation();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    setMainImage(product?.data?.images[0]);
  }, [product?.data]);

  const changeQtyHandler = async (e, product) => {
    const quantity = e.target.value
    if(quantity > product.countInStock) return toast.error("Out of stock")
    if(quantity <= 0 ) return toast.error('Invalid quantity value')
      try {
      const cartId = localStorage.getItem("cartID");
      if(cartId) {
        await addToCart({productId:product._id, cartId}).unwrap()
      }else {
        const res = await addToCart({productId:product._id}).unwrap()
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err)
    }
  };

  const addToCartHandler = async () => {
    try {
      const cartId = localStorage.getItem("cartID");
      if(cartId) {
        await addToCart({productId:product._id, cartId}).unwrap()
      }else {
        const res = await addToCart({productId:product._id}).unwrap()
        localStorage.setItem('cartID', res._id);
      }
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err)
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return  <div className='h-full my-auto text-center'>
    <Loader/>
  </div>;

  if (error) return <div className="alert">Error: {error.message || "Something went wrong"}</div>;

  return (
    <NavAnimation>
      {product.data &&<>
      <Meta title={product?.data.name} />
      <div className="md:container md:mx-auto mt-4">
      <div className="gap-2 md:grid md:grid-cols-12">
        <div className="flex gap-1 md:col-span-5">
          <div className="bd flex w-[20%] flex-col gap-1">
            {product?.data.images.map((image) => (
                <div
                  key={image}
                  className="bd cursor-pointer h-[20%] rounded-md border   text-main hover:opacity-30"
                >     
                  <img
                    className="mb-2 h-full w-full "
                    src={image}
                    alt={product?.data.name}
                    onClick={() => setMainImage(image)}
                  />
                </div>
              ))}
          </div>
          <div className="w-[80%]">
            <img
              className="h-full text-main"
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
          <p className="text-main">
            <strong>Description:</strong> {product?.data?.description}
          </p>
          <div className="flex items-center mt-3 justify-between md:px-10">
            {product?.data?.countInStock > 0 ? (
              <>
                <input
                    className="w-14 py-2"
                    placeholder='1'
                    type="number"
                    onChange={(e)=>changeQtyHandler(e,product?.data)}
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
            ): <p className='text-red-500 text-2xl'>Out of Stock</p> }
        </div>
        </div>
      </div>
      <hr className='my-3' />
      <div className="review">
        <div>
          {product?.data?.reviews.length == 0 ? (
            <p
              role="info"
              className="border-collapse rounded-md border-red-400 bg-red-400 py-2 pl-5 text-white"
            >
              No reviews
            </p>
          ):
          <div className="text-main">
            {product?.data?.reviews.map((review) => (
              <div key={review._id} className="mb-2 flex justify-between">
                <div className='overflow-hidden my-2 flex gap-3'>
                  <img className='w-12 h-12  rounded-full' src={review.image} />
                  <div>
                    <p className='font-bold text-main'>{review.name}</p>
                    <p className='text-gray-400 text-sm'>{review.comment}</p>
                  </div>
                </div>
                <div>
                    <Rating value={review.rating} />
                    <p className="text-sm text-main opacity-70">
                      {format(review.createdAt, "dd/MM/yy")}
                    </p>
                  </div>
              </div>
            ))}
            
          </div>
          }
          <div>
              {loadingReview && <Loader />}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div>
                    <label>Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - VeryGood</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label>Comment:</label>
                    <textarea
                      rows="4"
                      value={comment}
                      placeholder="Write your review here..."
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="btn mt-2"
                    disabled={loadingReview}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <h3 role="info" className="alert">
                  Please Login to review
                </h3>
              )}
            </div>
        </div>
      </div>
      </div>
      </>
      }
    </NavAnimation>
  );
}

export default ProductDetails;
