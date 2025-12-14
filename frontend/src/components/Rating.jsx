/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
function Rating({ value, count }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-2"
    >
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${i < Math.floor(value) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
              }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {value} ({count} reviews)
      </span>
    </motion.div>
  );
}

export default Rating;
