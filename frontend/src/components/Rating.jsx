import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function Rating({ value, text }) {
  return (
    <div className="rating">
      <span>{value >= 1 ? <FaStar /> : <FaRegStar />}</span>
      <span>{value >= 2 ? <FaStar /> : <FaRegStar />}</span>
      <span>{value >= 3 ? <FaStar /> : <FaRegStar />}</span>
      <span>{value >= 4 ? <FaStar /> : <FaRegStar />}</span>
      <span>{value >= 5 ? <FaStar /> : <FaRegStar />}</span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
}

export default Rating;
