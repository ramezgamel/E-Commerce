import { Link, Navigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import { useRef } from 'react';
import {useClearCouponMutation, useDeleteFromCartMutation} from '../store/cartApiSlice.js'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useApplyCouponMutation } from '../store/cartApiSlice.js';
import {useAddToCartMutation} from "../store/cartApiSlice.js"
function Cart() {
  const couponRef = useRef();
  const quantityRef = useRef();
  const {userInfo} = useSelector(state => state.auth);
  const {cart} = useSelector((state) => state.offline);
  const [applyCoupon, {isLoading:couponLoader, isError:isCouponError}] = useApplyCouponMutation();
  const [removeFromCart] = useDeleteFromCartMutation();
  const [clearCouponApi] = useClearCouponMutation()
  const [addToCart, {isLoading:addToCartLoading}] = useAddToCartMutation();
  
  const removeFromCartHandler = async(productId) =>{
    try {
      await removeFromCart({cartId:cart._id,productId}).unwrap();
      toast.success("Removed successfully");
    } catch (err) {
      toast.error(err)
    }
  };

  const changeQtyHandler = async (e,product) => {
    if(addToCartLoading) return null
    const quantity = e.target.value
    if(quantity > product.countInStock) return toast.error("Out of stock")
    if(quantity <= 0 ) return toast.error('Invalid quantity value')
    try {
      const cartId = localStorage.getItem("cartID");
        if(cartId) {
          await addToCart({productId:product._id, quantity, cartId}).unwrap()
        }else {
            const res = await addToCart({productId:product._id, quantity}).unwrap()
          localStorage.setItem('cartID', res._id);
        }
        toast.success("Added to cart")
    } catch (err) {
      toast.error(err)
    } 
  };

  const applyCouponHandler = async () => {
    try {
      await applyCoupon({cartId:cart?._id, couponName:couponRef.current.value}).unwrap();
    } catch (err) {
      toast.error(err.data.message)
    }
  };

  const clearCoupon = async()=>{
    try {
      await clearCouponApi(localStorage.getItem("cartID")).unwrap()
    } catch (err) {
      toast.error(err?.message || "something went wrong")
    }
  }
  if(!cart || cart.cartItems.length == 0 ) return <Navigate to={"/"} />
  return (
    <div className='mx-auto max-w-3xl'>
      <h1 className="mb-2 text-3xl text-main py-4">Cart <span className='text-gray-400 text-sm'>({cart?.cartItems.length} item)</span> </h1>
      <section className='sm:grid grid-cols-12 gap-5'>
        <div className='col-span-8'>
          {cart?.cartItems?.length && cart?.cartItems?.map(item=>
            <div className='grid grid-cols-4 rounded-md mb-3 bg-back py-3 px-2 gap-2' key={item._id}> 
              <Link className='col-span-1' to={`/product/${item.product._id}`} >
                <img className='h-24 w-24' src={item.product.images[0]} alt={item.product.name} />
              </Link>
              <div className='col-span-3'>
              <h3 className='text-main'>{item.product.name}</h3>
              <p className='text-main '>EGP {item.product.priceAfterDiscount? 
                <span className='inline-flex gap-3'>
                  <span className='line-through text-gray-400'>{item.product.price}</span> 
                  <span>{item.product.priceAfterDiscount}</span>
                </span>
                :<span>{item.product.price}</span>} 
              </p>
              <div className='flex items-center justify-between'>
                <input ref={quantityRef} onChange={(e)=>changeQtyHandler(e,item.product)} type="number" className='w-10 p-1 text-center' defaultValue={item.quantity} />
                <div onClick={()=>removeFromCartHandler(item.product._id)} className='p-2 bg-red-600 rounded-md cursor-pointer'>
                  <FaTrash className='text-white'/>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
        {/* Order Summary */}
        <div className='shadow-md col-span-4 bg-back h-fit p-2 text-main rounded-md'>
          <h2 className='md:text-xl font-extrabold text-center mb-4'>Order Summary</h2>
          {cart?.isCoupon ? <div className='flex justify-between items-center'>
            <p className='text-green-500 px-5'>You get discount: {cart.coupon}%</p> 
            <button className='btn !bg-red-500' onClick={clearCoupon}>Clear Coupon</button>
          </div> :
            <div className="flex justify-between ">
              <input type="text" ref={couponRef} disabled={cart?.isCoupon} placeholder='Coupon Code' className='rounded-r-[0]'/>
              <button className='btn !rounded-l-[0px]' disabled={couponLoader | cart?.isCoupon} onClick={applyCouponHandler}>{couponLoader ? <Loader/>: "Apply"}</button>
            </div>
          }
          {isCouponError && <p className='text-red-500 px-5'>Invalid coupon</p> }
          <div className='flex text-sm md:text-bases text-main my-1 justify-between'>
            <p >Subtotal <span className='text-gray-500 text-xs'>({cart?.cartItems.length} item)</span> </p>
            <span>{cart?.totalPrice}</span>
          </div>
          {cart?.isCoupon && 
            <div className='flex text-sm md:text-bases text-main my-1 justify-between'>
              <p >Discount</p>
              <span>{(cart?.totalPrice - cart?.totalPriceAfterDisCount).toFixed(2)}</span>
            </div>
          }
          <p className='flex text-sm md:text-base text-main my-1 justify-between'>Shipping <span>{cart?.shipping == 0 ? "Free" : cart?.shipping}</span></p>
          <hr />
          <p className='flex font-bold my-1 md:text-lg justify-between'>Total: <span className='md:text-lg font-semibold'>{cart?.totalPriceAfterDisCount?cart?.totalPriceAfterDisCount: cart?.totalPrice}</span></p>
          <Link to={userInfo?"/shipping" : "/auth"} >
            <button className='btn w-full my-4 uppercase'>CheckOUt</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Cart;
