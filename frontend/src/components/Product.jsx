/* eslint-disable react/prop-types */
import { FaHeart,FaRegHeart,FaShuttleVan, FaTrash } from 'react-icons/fa';
import {MdOutlineAddShoppingCart}from "react-icons/md"
import RatingAvg from './RatingAvg';
import { useAddToWishListMutation, useDeleteItemFromWishListMutation } from '../store/wishListApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { useAddToCartMutation,useDeleteFromCartMutation } from '../store/cartApiSlice';
import { setCartID } from '../store/offlineSlice';
import { useDispatch, useSelector } from 'react-redux';

function Product({ product,isInWishList,isInCart }) {
  const [addToWish, {isLoading:addLoad}] = useAddToWishListMutation()
  const [deleteFromWish, {isLoading:removeLoad}] = useDeleteItemFromWishListMutation()
  const [removeFromCart,{isLoading: removeCartLoad}] = useDeleteFromCartMutation()
  const [addToCart, {isLoading: addCartLoad}] = useAddToCartMutation();
  const {cartID} = useSelector(state=>state.offline);
  const {userInfo} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const addToWishList= async(e) => {
    e.preventDefault()
    if(userInfo.role == "admin") return toast.error("Unavailable for admins")
    try {
      await addToWish(product._id).unwrap();
      toast.success("Added to wish list")
    } catch (err) {
      toast.error("Only logged in users")
    }
  };
  const deleteToWishList= async(e) => {
    e.preventDefault()
    try {
      await deleteFromWish(product._id).unwrap();
      toast.success("Product removed")
    } catch (err) {
      toast.error(err)
    }
  };
  const addToCartHandler = async (e) => {
    e.preventDefault();
    if(userInfo.role == "admin") return toast.error("Unavailable for admins")
    if(product.countInStock == 0 ) return 
    try {
      if(cartID) {
        await addToCart({productId:product._id, cartId:cartID}).unwrap()
      }else {
        const res = await addToCart({productId:product._id}).unwrap()
        dispatch(setCartID(res._id))
      }
      toast.success("Added to cart")
    } catch (err) {
      toast.error(err)
    }
  };

  const removeFromCartHandler = async(e,productId) =>{
    e.preventDefault()
    const cartId = localStorage.getItem("cartID");
    if(!cartId) return toast.error("Invalid cart")
    try {
      await removeFromCart({cartId,productId}).unwrap();
      toast.success("Removed successfully");
    } catch (err) {
      toast.error(err)
    }
  };
  return (
    <div className='bg-back p-2 h-full border border-slate-600 max-w-md min-h-[240px] rounded-md overflow-hidden' >
      <Link to={"/product/"+product._id}>
        <div className='relative h-[65%] '>
          <span className='absolute top-2 flex justify-center items-center cursor-pointer right-2 size-9 rounded-md p-2 shadow-md bg-white'>
            {addLoad || removeLoad ? <Loader /> : isInWishList ?  
              <FaHeart onClick={deleteToWishList} className='text-red-600 w-full h-full'/> : <FaRegHeart onClick={addToWishList} className='text-gray-800 w-full h-full' />
            }
          </span>
          <img className='h-full mx-auto' src={product.images[0]} alt={product.name} />
          {
            product.countInStock > 0 ? <span className='absolute w-9 h-9 p-2 flex justify-center items-center  rounded-md bottom-2 right-2 shadow-md cursor-pointer bg-white'>
            {removeCartLoad || addCartLoad ? <Loader/> :isInCart ? <FaTrash onClick={(e)=>removeFromCartHandler(e,product._id)} className='text-red-600 w-full h-full'/> : 
            <MdOutlineAddShoppingCart  onClick={addToCartHandler}  className='text-gray-800 w-full h-full' />
            }
          </span>: <span className='absolute h-9 p-2 flex justify-center items-center  rounded-md -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 shadow-md cursor-pointer bg-red-400/70 text-sm whitespace-nowrap'>Out of Stock</span>
          }
          
          <span className='absolute left-2 bottom-2'>
            <RatingAvg ratingAvg={product.rating.toFixed(1)} ratingsNum={product.numReviews} />
          </span>
        </div>
        <div className='mt-1 flex flex-col justify-between h-[35%]'>
          <h2 className='font-semibold text-sm sm:text-base line-clamp-2 '>{product.name}</h2>
          <div>
            <div className='flex text-sm gap-1'>
            <span>EGP</span>
            <span className='font-semibold'>{product.price}</span>
            { product.discount && <>
            <span className='line-through text-slate-500'>{product.price}</span>
            <span className='text-green-600'>{product.discount}%</span>
              </>}
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <FaShuttleVan className='text-blue-500'/>
            {product.shipping ? product.shipping :'Free Delivery' }
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
