import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../store/productsApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'sonner';
import { useState } from 'react';
import Paginate from '../../components/Paginate';
import Model from '../../components/Modal';
import ProductForm from '../../components/form/ProductForm';
import AdminSearchBox from '../../components/AdminSearchBox';
import Table from '../../components/Table';
import Sort from '../../components/Sort';


function ProductList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState('');
  const [product, setProduct] = useState({});
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');

  const { data: products, isLoading, error } = useGetProductQuery({ keyword, page, sort, dec: toggle });
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
    } finally {
      setShow(false);
    }
  };
  const handleCreate = async (newPrd) => {
    try {
      await createProduct(newPrd).unwrap();
      toast.success('Product created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    } finally {
      setShow(false);
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
      setShow(false);
    }
  };
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
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
      <div className="px-4 mt-3 overflow-auto h-full pb-4 no-scrollbar bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <AdminSearchBox keyword={keyword} setKeyword={setKeyword} />
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
          <Sort sort={sort} setSort={setSort} setToggle={setToggle} values={['name', 'price', 'rating']} />
        </div>
        <Table headers={['name', 'price', 'Stock', 'category', 'Brand', 'actions']} isLoading={isLoading} error={error} >
          {
            products?.data.map((product) => (
              <tr
                key={product._id}
                className="border-b text-center dark:border-gray-700 "
              >
                <td className="px-2">
                  <p className='line-clamp-2 py-1'>{product.name}</p>
                </td>
                <td className="px-2">{product.price}</td>
                <td className="px-2">{product.countInStock}</td>
                <td className="px-2">{product.category?.name}</td>
                <td className="px-2">{product.brand}</td>
                <td className="">
                  <div className='flex justify-between gap-1 items-center'>
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
                  </div>
                </td>
              </tr>
            ))}
        </Table>
        {/* PAGINATE  */}
        {products?.paginationResult.totalPages > 1 && (
          <div className="flex justify-center">
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
