import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from '../store/productsApiSlice';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addToCart } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
function ProductDetails() {
  const [mainImage, setMainImage] = useState('');
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
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
  useEffect(() => {
    setMainImage(product?.images[0]);
  }, [product]);
  const addQty = (e) => {
    if (e.target.value > product?.countInStock)
      return toast.warn('Out of stock');
    setQty(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
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
    <>
      <Meta title={product.name} />
      <div className="gap-1 md:grid md:grid-cols-12">
        <div className="flex gap-1 md:col-span-5">
          <div className="bd flex w-[20%] flex-col gap-1">
            {product?.images &&
              product?.images.map((image) => (
                <div
                  key={image}
                  className="bd cursor-pointer h-[20%] rounded-md border   text-main hover:opacity-30"
                >     
                  <img
                    className="mb-2 h-full w-full "
                    src={image}
                    alt={product?.name}
                    onClick={() => setMainImage(image)}
                  />
                </div>
              ))}
          </div>
          <div className="w-[80%]">
            <img
              className="h-full text-main"
              src={mainImage}
              alt={product?.name} 
            />
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="border-b border-slate-900/10 py-1 dark:border-slate-50/[0.06]">
            <h3 className="text-main">{product?.name}</h3>
            <Rating
              value={product?.rating}
              text={`${product?.numReviews} reviews`}
            />
          </div>
          <div className="border-b border-slate-900/10 py-1 dark:border-slate-50/[0.06]">
            <p className="text-main">
              <strong>Price:</strong> ${product?.price}
            </p>
            <p className="text-main">
              <strong>Brand:</strong> {product?.brand}
            </p>
            <p className="text-main">
              <strong>Category:</strong> {product?.category}
            </p>
          </div>
          <p className="text-main">
            <strong>Description:</strong> {product?.description}
          </p>
        </div>
        {/* BUY CARD  */}
        <div className="md:col-span-3">
          <div className="border-b border-slate-900/10 py-1 dark:border-slate-50/[0.06]">
            <div className="flex justify-between">
              <p className="text-main">
                {' '}
                <strong>Price:</strong>{' '}
              </p>
              <p className="text-main">
                <strong>${product?.price}</strong>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-main">
                {' '}
                <strong>Status:</strong>{' '}
              </p>
              <p className="text-main">
                <strong>
                  {product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </strong>{' '}
              </p>
            </div>
            {product?.countInStock > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-main">
                  {' '}
                  <strong>Quantity: </strong>{' '}
                </p>
                <input
                  className="w-16"
                  value={qty}
                  type="number"
                  onChange={addQty}
                />
              </div>
            )}
          </div>
          <button
            className="btn w-100 mt-2"
            type="button"
            disabled={product?.countInStock === 0}
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="review">
        <div>
          <h2 className="text-main">Reviews</h2>
          {product.reviews.length === 0 && (
            <p
              role="info"
              className="border-collapse rounded-md border-red-400 bg-red-400 py-2 pl-5 text-white"
            >
              No reviews
            </p>
          )}
          <div className="text-main">
            {product.reviews.map((review) => (
              <div key={review._id} className="mb-2">
                <div className="flex items-center justify-between border-b border-slate-900/10 dark:border-slate-50/[0.06] ">
                  <strong>{review.name}</strong>
                  <div>
                    <Rating value={review.rating} />
                    <p className="text-sm text-main opacity-70">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <p className="p-2">{review.comment}</p>
              </div>
            ))}
            <div>
              <h4 className="text-main">Write a review</h4>
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
  );
}

export default ProductDetails;
