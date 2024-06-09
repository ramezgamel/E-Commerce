import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserWishListQuery } from "../store/wishListApi";
import { useEffect } from "react";
import { setFavorite } from "../store/offlineSlice";

function FavoritePanel() {
  const dispatch = useDispatch()
  const {data:favData} = useGetUserWishListQuery()
    useEffect(()=>{
    dispatch(setFavorite(favData?.data))
  },[favData]);
  return (
    <Link className='relative'  to={`/profile/wishList`}>
      {favData?.data?.length > 0 && <span className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800'>{favData?.data?.length}</span> }
      <FaRegHeart className="h-7 w-7 text-main cursor-pointer hover:text-violet-600"/>
    </Link>
  )
}

export default FavoritePanel
