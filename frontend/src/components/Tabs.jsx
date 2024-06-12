/* eslint-disable react/prop-types */
import { useGetCatsQuery } from "../store/catApiSlice";
function Tabs({ setCategory, category }) {
  const { data } = useGetCatsQuery(1);
  return (
    <div className="w-full flex pt-1 font-medium border-b">
      <ul className="flex -mb-px no-scrollbar overflow-scroll">
        <li
          onClick={() => setCategory("")}
          className={`${category == "" ? "border-blue-600 text-blue-600" : "text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
          All
        </li>
        {data?.data?.map(cat =>
          <li
            key={cat._id}
            onClick={() => setCategory(cat._id)}
            className={`${category == cat._id ? "border-blue-600 text-blue-600" : "text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
            {cat.name}
          </li>)}
      </ul>
    </div>
  );
}

export default Tabs;
