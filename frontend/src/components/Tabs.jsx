/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { useGetCatsQuery } from "../store/catApiSlice";
import Loader from "./Loader"
function Tabs({setCategory,category}) {
  const {data} = useGetCatsQuery(1);
  return (
    <div className="fixed top-16 w-full z-40 text-sm font-medium text-gray-500 border-b pt-2 w-100 border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
      <ul className="flex flex-wrap -mb-px">
            <li 
                onClick={()=>setCategory("")}
                className={`${category == ""? "border-blue-600 text-blue-600":"text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
              All
            </li>
            <Suspense fallback={<Loader/>}>
              {data?.result?.map(cat => 
              <li 
                key={cat._id} 
                onClick={()=>setCategory(cat._id)}
                className={`${category == cat._id? "border-blue-600 text-blue-600":"text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
              {cat.name}
            </li> )}
            </Suspense>
        </ul>
    </div>
  )
}

export default Tabs
