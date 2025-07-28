import { FaShuttleVan } from 'react-icons/fa';
import RatingAvg from './RatingAvg';
import { Link } from 'react-router-dom';
import FavButton from './buttons/FavButton.jsx';
import CartButton from './buttons/CartButton.jsx';
import useIsIn from '../hooks/useIsIn.js';
import React from 'react';

const Product = React.memo(({ product }) => {
  const [isInCart, isInWishList] = useIsIn(product._id);
  return (
    <div className='bg-back p-2 h-full border border-slate-600 max-w-md min-h-[240px] max-h-[350px] rounded-md overflow-hidden' >
      <Link to={"/product/" + product._id}>
        <div className='relative h-[65%] '>
          <FavButton productId={product._id} isInWishList={isInWishList} />
          <img className='h-full mx-auto' src={product.images[0]} alt={product.name} />
          {
            product.countInStock > 0 ? <CartButton productId={product._id} isInCart={isInCart} />
              : <span className='absolute h-9 p-2 flex justify-center items-center  rounded-md -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 shadow-md cursor-pointer bg-red-400/70 text-sm whitespace-nowrap'>Out of Stock</span>
          }

          <span className='absolute left-2 bottom-2'>
            <RatingAvg ratingAvg={product.rating.toFixed(1)} ratingsNum={product.numReviews} />
          </span>
        </div>
        <div className='mt-1 flex flex-col justify-between h-[35%]'>
          <h2 className='font-semibold text-sm sm:text-base line-clamp-3 '>{product.name}</h2>
          <div>
            <div className='flex text-sm gap-1'>
              <span>EGP</span>
              <span className='font-semibold'>{product.price}</span>
              {product.discount && <>
                <span className='line-through text-slate-500'>{product.price}</span>
                <span className='text-green-600'>{product.discount}%</span>
              </>}
            </div>
            <div className='flex items-center gap-2 text-sm '>
              <FaShuttleVan className='text-blue-500' />
              {product.shipping ? product.shipping : 'Free Delivery'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

Product.displayName = "Product";
export default Product;
