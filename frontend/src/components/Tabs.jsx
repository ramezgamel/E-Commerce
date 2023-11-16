/* eslint-disable react/prop-types */
import { useGetCatsQuery } from "../store/catApiSlice";
function Tabs({setCategory,category}) {
  const {data} = useGetCatsQuery({page:1});
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b pt-1 border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
        <ul className="flex flex-wrap -mb-px">
            {data?.result?.map(cat => 
              <li 
                key={cat._id} 
                onClick={()=>setCategory(cat.name)}
                className={`${category == cat.name? "border-blue-600 text-blue-600":"text-main border-transparent"} mr-2 inline-block pb-2 px-3 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-400 hover:cursor-pointer`}>
              {cat.name}
            </li> )}
        </ul>
    </div>
  )
}

export default Tabs
