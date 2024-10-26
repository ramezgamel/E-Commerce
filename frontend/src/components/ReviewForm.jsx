import { useState } from "react";
import { useAddReviewMutation } from "../store/productsApiSlice";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [createReview, { isLoading: loadingReview }, refetch] = useAddReviewMutation();

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
  );
}

export default ReviewForm;
