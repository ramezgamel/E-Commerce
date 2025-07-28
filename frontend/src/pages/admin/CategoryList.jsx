import { useState } from "react";
import { useGetCatsQuery } from "../../store/catApiSlice";
import Paginate from "../../components/Paginate";
import { FaEdit } from "react-icons/fa";
import Model from "../../components/Modal";
import CategoryForm from "../../components/form/CategoryForm";
import Table from "../../components/Table";

function CategoryList() {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const { data: categories, isLoading, error } = useGetCatsQuery({ page });

  const editCategory = (cat) => {
    setCategory(cat);
    setShow(true);
  };

  return (
    <div className="p-4 mt-3 overflow-hidden  h-full pb-4 no-scrollbar bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="mb-5 flex justify-between">
        <h2 className="text-main">Categories</h2>
        <button
          className="btn"
          onClick={() => setShow(true)}
        >Create Category</button>
      </div>
      <Model
        header={`${category ? "Update Category" : "Create Category"}`}
        show={show}
        setShow={setShow}
      >
        <CategoryForm setShow={setShow} category={category} />
      </Model>
      <div className="overflow-auto">
        <Table error={error} isLoading={isLoading} headers={['id', 'name', 'actions']} >
          {categories?.data.length > 0 && categories?.data.map(cat => <tr
            key={cat._id}
            className="border-b text-center dark:border-gray-700"
          >
            <td className="p-2">{cat._id}</td>
            <td className="p-2">{cat.name}</td>
            <td className="flex justify-center gap-1 py-2 pr-2">
              <button
                onClick={() => editCategory(cat)}
                className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
              >
                <FaEdit />
              </button>
            </td>
          </tr>)}
        </Table>

      </div>
      {categories?.paginationResult?.totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Paginate
            pages={categories?.paginationResult?.totalPages}
            pageNum={categories?.paginationResult?.currentPage}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryList;
