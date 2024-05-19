/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

function RatingAvg({ratingAvg, ratingsNum}) {
  return (
    <div className="flex gap-2 w-fit px-1 items-center bg-white rounded-full">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-gray-800">{ratingAvg}</span>
        <FaStar className="text-green-600 w-3 h-3"/>
      </div>
      <div className="text-slate-400 text-sm">({ratingsNum})</div>
    </div>
  )
}

export default RatingAvg
