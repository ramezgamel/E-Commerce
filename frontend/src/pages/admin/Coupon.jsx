import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteCouponMutation, useGetCouponsQuery } from "../../store/couponApiSlice";
import { format } from "date-fns";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { useState } from "react";
import Model from "../../components/Modal";
import CouponForm from "../../components/CouponForm";

function Coupon() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [coupon , setCoupon] = useState()
  const {data:coupons, isFetching, isLoading, error} = useGetCouponsQuery(page);
  const [deleteCoupon, {isLoading:deleteLoading}] = useDeleteCouponMutation()
  return (
    <div className="p-4 mt-3 overflow-hidden  h-full pb-4 no-scrollbar bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
    <div className="mb-5 flex justify-between">
      <h2 className="text-main">Coupons</h2>
      <button 
        className="btn"
        onClick={()=>setShow(true)}
      >Create Coupon</button>
        <Model
          header={`${coupons? "Update Coupon": "Create Coupon"}`}
          show={show}
          setShow={()=> {setShow(false); setCoupon(false)}}
    >
      <CouponForm setShow={setShow} coupon={coupon}/>
    </Model>
    </div>
      <div className="overflow-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2">
                  name
                </th>
                <th scope="col" className="p-2">
                  discount
                </th>
                <th scope="col" className="p-2">
                  expire in
                </th>
                <th scope="col" className="p-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {
              error ? (
              <tr className="w-[100%] text-center">
                <div role="info" className="alert">
                  {error.error || 'Something went wrong'}
                </div>
              </tr>
            ) : (
              <tbody>
                { !isFetching &&
                  coupons.data.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{c.name}</td>
                      <td className="p-2">{c.discount} %</td>
                      <td className="p-2">{format(c.expire, "dd/MM hh:MM")}</td>
                      <td className="flex justify-center gap-1 py-2 pr-2">
                        <button
                          onClick={() => {
                            setCoupon(c);
                            setShow(true);
                          }}
                          className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                          onClick={async()=> await deleteCoupon(c._id)}
                        >
                          {deleteLoading? <Loader/> :  <FaTrash />}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )} 
          </table>
        </div>
        {isLoading || isFetching ? (
            <div className="py-5 text-center">
              <Loader />
            </div>
          ) : (
            coupons.data.length === 0 && (
              <div className="py-5 text-center">
                <strong className="text-main">Not Found</strong>
              </div>
            )
          )}
        {/* PAGINATE  */}
        {coupons?.paginationResult?.totalPages > 1 &&(
        <div className="d-flex justify-content-center">
          <Paginate
            pages={coupons?.paginationResult?.totalPages}
            pageNum={coupons?.paginationResult?.currentPage}
            setPage={setPage}
          />
        </div>
        )}
    </div>
  )
}

export default Coupon
