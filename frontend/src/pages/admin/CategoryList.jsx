import { useState } from "react";
import { useDeleteCatMutation, useGetCatsQuery } from "../../store/catApiSlice";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import Model from "../../components/Modal";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";

function CategoryList() {
  const [show, setShow ] = useState(false)
  const [page, setPage] = useState(1);
  const [category, setCategory]= useState('');
  const {data:categories, isLoading, isFetching, error} = useGetCatsQuery({page});
  const [deleteCat]= useDeleteCatMutation();
  const deleteCategory= async (id) => {
    try {
      await deleteCat(id).unwrap();
      toast.success("Category deleted")
    } catch (err) {
      toast.error(err?.message || "Something went wrong")
    }
  }
  return (
    <div className="p-4 mt-3 overflow-hidden  h-full pb-4 no-scrollbar bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
    <div className="mb-5 flex justify-between">
      <h2 className="text-main">Categories</h2>
      <button 
        className="btn"
        onClick={()=>setShow(true)}
      >Create Category</button>
    </div>
    <Model
      header={`${category? "Update Category": "Create Category"}`}
      show={show}
      setShow={setShow}
    >
      <CategoryForm setShow={setShow} category={category}/>
    </Model>
      <div className="overflow-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2">
                  ID
                </th>
                <th scope="col" className="p-2">
                  Name
                </th>
                <th scope="col" className="p-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {
              error ? (
              <tr className="w-[100%] text-center">
                <div role="info" className="alert">
                  {error.error || 'Something went wrong'}
                </div>
              </tr>
            ) : (
              <tbody>
                { !isFetching &&
                  categories.data.map((cat) => (
                    <tr
                      key={cat._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{cat._id}</td>
                      <td className="p-2">{cat.name}</td>
                      <td className="flex justify-center gap-1 py-2 pr-2">
                        <button
                          onClick={() => {
                            setCategory(cat);
                            setShow(true);
                          }}
                          className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                          onClick={() => deleteCategory(cat._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )} 
          </table>
        </div>
        {isLoading || isFetching ? (
            <div className="py-5 text-center">
              <Loader />
            </div>
          ) : (
            categories.data.length === 0 && (
              <div className="py-5 text-center">
                <strong className="text-main">Not Found</strong>
              </div>
            )
          )}
        {/* PAGINATE  */}
        {categories?.paginationResult?.totalPages > 1 &&(
        <div className="d-flex justify-content-center">
          <Paginate
            pages={categories?.paginationResult?.totalPages}
            pageNum={categories?.paginationResult?.currentPage}
            setPage={setPage}
          />
        </div>
        )}
    </div>
  )
}

export default CategoryList
