import { toast } from "sonner";
import { useAddToWishListMutation, useDeleteItemFromWishListMutation } from "../../store/wishListApi";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

function FavButton({ productId, isInWishList }) {
  const [addToWish, { isLoading: addLoad }] = useAddToWishListMutation();
  const [deleteFromWish, { isLoading: removeLoad }] = useDeleteItemFromWishListMutation();
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const addToWishList = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error("Login First");
      return navigate("/auth");
    }
    if (userInfo.role == "admin") return toast.error("Unavailable for admins");
    try {
      await addToWish(productId).unwrap();
      toast.success("Added to wish list");
    } catch (err) {
      toast.error("Only logged in users");
    }
  };
  const deleteToWishList = async (e) => {
    e.preventDefault();
    try {
      await deleteFromWish(productId).unwrap();
      toast.success("Product removed");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <span className=' flex justify-center items-center cursor-pointer  size-9 rounded-md p-2 shadow-md bg-white hover:scale-[1.15] hover:bg-slate-200 transition-colors'>
      {addLoad || removeLoad ? <Loader /> : isInWishList ?
        <FaHeart onClick={deleteToWishList} className='text-red-600 w-full h-full' /> : <FaRegHeart onClick={addToWishList} className='text-gray-800 w-full h-full' />
      }
    </span>
  );
}
export default FavButton;
