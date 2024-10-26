/* eslint-disable react/prop-types */
import { useCreateCouponMutation, useUpdateCouponMutation } from "../store/couponApiSlice";
import Loader from "./Loader";
import {toast} from "react-toastify";

function CouponForm({setShow,coupon}) {
  const [createCoupon, {createLoading}] = useCreateCouponMutation();
  const [updateCoupon, {isLoading}] = useUpdateCouponMutation();

  const submit = async (e) => {
    e.preventDefault();
    const data = {name:e.target.name.value,discount:e.target.discount.value,expire:e.target.expire.value}
    try {
      if(coupon){
        await updateCoupon({couponId: coupon._id, ...data}).unwrap();
        toast.success("Updated successfully")
      }else{
        await createCoupon(data).unwrap()
        toast.success("Created successfully")
      }setShow(false)
    } catch (err) {
      console.log(err)
      toast.error("sa")
    }
  }
  return (
  <>
    {(createLoading || isLoading)? <Loader/>: 
      <form onSubmit={submit}>
        <div className="my-2">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" defaultValue={coupon?.name &&coupon.name} required/>
        </div>
        <div className="my-2">
          <label htmlFor="discount">Discount</label>
          <input type="number" id="discount" name="discount" defaultValue={coupon?.discount && coupon.discount} required/>
        </div>
        <div className="my-2">
          <label htmlFor="expire">Expire In</label>
          <input type="date" id="expire" name="expire" min={new Date().toISOString().split("T")[0]} required/>
        </div>
        <button type="submit" className="btn float-right mt-2">{coupon ? "Update": "Create" }</button>
      </form>
    }
  </>
  )
}

export default CouponForm
