/* eslint-disable react/prop-types */
import { FaStar, FaRegStar } from "react-icons/fa";
function Rating({ value, text }) {
  return (
    <div className="flex items-center">
      <span>{value >= 1 ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-main"/>}</span>
      <span>{value >= 2 ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-main"/>}</span>
      <span>{value >= 3 ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-main"/>}</span>
      <span>{value >= 4 ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-main"/>}</span>
      <span>{value >= 5 ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-main"/>}</span>
      <span className="ml-2 text-main">{text}</span>
    </div>
  );
}

export default Rating;
