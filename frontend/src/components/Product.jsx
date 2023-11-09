/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { addToCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

function Product({ product }) {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const qty = 1;
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div
      className="h-[300px] max-w-sm rounded-lg border 
    border-gray-200 bg-slate-50 shadow transition-colors hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800  dark:transition-colors dark:hover:bg-gray-600"
    >
      <div className="h-[55%]">
        <Link to={`/product/${product?._id}`}>
          <img
            className="h-full rounded-t-lg"
          src={import.meta.env.VITE_BASE_URL + product?.images[0]}
          />
        </Link>
      </div>
      <div className="h-[45%] px-3 py-2">
        <div>
          <Link to={`/product/${product?._id}`}>
            <h6 className="h-10 text-main">
              <strong>{product?.name.slice(0, 35)}</strong>
            </h6>
          </Link>
          <div className="text-sec">
            <Rating
              value={product?.rating}
              text={`${product?.numReviews} reviews`}
            />
          </div>
          <div className="flex justify-between">
            <div className="text-xl text-main">${product?.price}</div>
            <button className="btn" onClick={addToCartHandler}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
