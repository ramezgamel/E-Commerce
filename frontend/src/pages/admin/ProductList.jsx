import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsFeaturesMutation,
  useUpdateProductMutation,
} from '../../store/productsApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Paginate from '../../components/Paginate';
import Model from '../../components/Modal';
import ProductForm from '../../components/ProductForm';
import { HiSwitchVertical } from 'react-icons/hi';
import AdminSearchBox from '../../components/AdminSearchBox';
function ProductList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState('Default');
  const [product, setProduct] = useState({});
  const [keyword, setKeyword] = useState('');
  const [toggle, setToggle] = useState('+');
  const [products, setProducts] = useState({});
  const [getProducts, { isLoading, error }] = useGetProductsFeaturesMutation();
  const [deletePrd] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  useEffect(() => {
    const getData = async () => {
      const prds = await getProducts({ keyword, page, sort, dec: toggle });
      setProducts(prds);
    };
    getData();
  }, [toggle, getProducts, page, sort, keyword]);
  const deleteProduct = async (id) => {
    try {
      if (window.confirm('Are you sure?')) {
        await deletePrd(id);
        toast.success('Product Deleted');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleCreate = async (newPrd) => {
    try {
      const formData = new FormData();
      Object.keys(newPrd).map((key) => {
        if (key == 'images') {
          for (let i = 0; i < newPrd.images.length; i++) {
            formData.append('images', newPrd.images[i]);
          }
        } else {
          formData.append(key, newPrd[key]);
        }
      });
      await createProduct(formData).unwrap();
      toast.success('Product created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  const editProduct = async (updatedPrd) => {
    try {
      const formData = new FormData();
      Object.keys(updatedPrd).map((key) => {
        if (key == 'images') {
          for (let i = 0; i < updatedPrd.images.length; i++) {
            formData.append('images', updatedPrd.images[i]);
          }
        } else {
          formData.append(key, updatedPrd[key]);
        }
      });
      await updateProduct(formData).unwrap();
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
        handleClose={() => setShow(false)}
        header={product ? 'Update Product' : 'Create Product'}
      >
        {loadingCreate || loadingUpdate ? (
          <Loader />
        ) : !product ? (
          <ProductForm btnName="Create" submit={handleCreate} />
        ) : (
          <ProductForm
            btnName="Update"
            submit={editProduct}
            product={product}
          />
        )}
      </Model>
      <div className="relative mx-3 mt-3 overflow-auto bg-slate-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* NAV  */}
        <div className="flex  items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
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
          <div className="flex  w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
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
              <option value="default">Default</option>
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
            {isLoading ? (
              <div className="w-full ">
                <Loader />
              </div>
            ) : error ? (
              <tr className="w-[100%] text-center">
                <div role="info" className="alert">
                  {error.error || 'Something went wrong'}
                </div>
              </tr>
            ) : (
              <tbody>
                {products?.data &&
                  products?.data?.result.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="p-2">{product._id}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">{product.category}</td>
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
        {/* PAGINATE  */}
        <div className="d-flex justify-content-center">
          <Paginate
            pages={products?.data?.totalPages}
            pageNum={products?.data?.page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
}

export default ProductList;
