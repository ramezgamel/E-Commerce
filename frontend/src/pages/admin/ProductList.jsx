import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../store/productsApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {useState } from 'react';
import Paginate from '../../components/Paginate';
import Model from '../../components/Modal';
import ProductForm from '../../components/ProductForm';
import { HiSwitchVertical } from 'react-icons/hi';
import AdminSearchBox from '../../components/AdminSearchBox';
function ProductList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState('');
  const [product, setProduct] = useState({});
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const {data:products, isLoading,isFetching, error} = useGetProductQuery({ keyword, page, sort, dec: toggle });
  const [deletePrd] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();


  const deleteProduct = async (id) => {
    try {
      if (window.confirm('Are you sure?')) {
        await deletePrd(id).unwrap();
        toast.success('Product Deleted');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleCreate = async (newPrd) => {
    try {
      await createProduct(newPrd).unwrap();
      toast.success('Product created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  const editProduct = async (updatedPrd) => {
    try {
      await updateProduct(updatedPrd).unwrap();
      toast.success('Product updated');
    } catch (err) {
      toast.error(err?.message || 'Something went wrong..!');
    } finally {
      setProduct({});
    }
  };
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        // handleClose={() => {
        //   setShow(false)
        //   Object.keys(product).length !== 0 && setProduct({})
        // }}
        header={Object.keys(product).length !== 0 ? 'Update Product' : 'Create Product'}
      >
        {loadingCreate || loadingUpdate ? (
          <Loader />
        ) : Object.keys(product).length === 0 ? (
          <ProductForm btnName="Create" submit={handleCreate} />
        ) : (
          <ProductForm
            btnName="Update"
            submit={editProduct}
            product={product}
          />
        )}
      </Model>
      <div className="px-4 mt-3 overflow-auto bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* NAV  */}
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
          {/* ADD PRODUCT BUTTON  */}
          <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <button
              onClick={() => {
                setShow(true);
              }}
              type="button"
              className="flex items-center justify-center rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-4  focus:ring-slate-300 dark:bg-violet-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Add product
            </button>
          </div>
          {/* SORT  */}
          <div className="flex w-full flex-shrink-0 gap-2 items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <label htmlFor="sort" className="my-auto">
              Sort
            </label>
            <select
              value={sort}
              className="cursor-pointer px-2 py-1"
              name="sort"
              id="sort"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
            <HiSwitchVertical
              className="h-10 w-10 cursor-pointer text-main"
              onClick={() => setToggle((prev) => (prev == '+' ? '-' : '+'))}
            />
          </div>
        </div>


        {/* TABLE  */}
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
                  Price
                </th>
                <th scope="col" className="p-2">
                  Category
                </th>
                <th scope="col" className="p-2">
                  Brand
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
                  products?.data.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{product._id}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">{product.category.name}</td>
                      <td className="p-2">{product.brand}</td>
                      <td className="flex justify-center gap-1 py-2 pr-2">
                        <button
                          onClick={() => {
                            setProduct(product);
                            setShow(true);
                          }}
                          className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-400"
                          onClick={() => deleteProduct(product._id)}
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
            products?.data.length === 0 && (
              <div className="py-5 text-center">
                <strong className="text-main">Not Found</strong>
              </div>
            )
          )}
        {/* PAGINATE  */}
        {products?.paginationResult.totalPages > 1 &&(
        <div className="d-flex justify-content-center">
          <Paginate
            pages={products?.paginationResult.totalPages}
            pageNum={products?.paginationResult.currentPage}
            setPage={setPage}
          />
        </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
