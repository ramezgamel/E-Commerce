/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddReviewMutation } from "../store/productsApiSlice";
import { toast } from "react-toastify";
import Rating from "./Rating";
import { format } from "date-fns";
import Loader from "./Loader";

function Reviews({product}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReview }, refetch] = useAddReviewMutation();
  console.log(product);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id:product._id, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="review">
            <div>
              {product?.data?.reviews.length == 0 ? (
                <p
                  role="info"
                  className="border-collapse rounded-md border-red-400 bg-red-400 py-2 pl-5 text-white"
                >
                  No reviews
                </p>
              ) :
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
  )
}

export default Reviews
