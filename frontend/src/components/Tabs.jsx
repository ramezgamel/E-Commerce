/* eslint-disable react/prop-types */
import { useGetCatsQuery } from "../store/catApiSlice";
import { motion as m } from "framer-motion";

const containerVariants = {
  hidden:{
    opacity:0,
  },
  show:{
    opacity:1,
    transition:{
      delayChildren:.3,
      staggerChildren: 3
    }
  },
};
const childVariants = {
  hidden: {
    x: "100vw",
  },
  show: {
    x: 0,
  },
  hover:{
    scale:1.1
  }
};
function Tabs({ setCategory, category, setPage }) {
  const { data } = useGetCatsQuery(1);
  return (
    <div className="w-full flex pt-1 font-medium border-b">
      <m.ul variants={containerVariants} initial="hidden" animate="show" className="flex overflow-y-hidden -mb-px no-scrollbar overflow-scroll">
        <li 
          onClick={() => setCategory("")}
          className={`${category == "" ? "border-blue-600 text-blue-600" : "text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
          All
        </li>
        {data?.data?.map((cat,i) =>
          <m.li
            variants={childVariants}
            initial="hidden" animate="show"
            whileHover="hover"
            key={i}
            onClick={() => {
              setCategory(cat._id);
              setPage(1)
            }}
            className={`${category == cat._id ? "border-blue-600 text-blue-600" : "text-main border-transparent"} mr-2 whitespace-nowrap inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:cursor-pointer`}>
            {cat.name}
          </m.li>
        )}
      </m.ul>
    </div>
  );
}

export default Tabs;
