import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../store/productsApiSlice";
import ProductForm from "../../components/ProductForm";
import { toast } from "react-toastify";
function ProductEdit() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const [updatePrd, { isLoading: updateLoading }] = useUpdateProductMutation();
  const updateHandler = async (id, prd) => {
    try {
      const formData = new FormData();
      Object.keys(prd).map((key) => {
        formData.append(key, prd[key]);
      });
      await updatePrd({ id, formData }).unwrap();
      toast.success("Product updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Edit Product</h1>
      {isLoading && <Loader />}
      {updateLoading && <Loader />}
      {error && <div className="alert">{error.message}</div>}
      <ProductForm
        submit={updateHandler}
        product={product}
        btnName={"Update"}
      />
    </>
  );
}

export default ProductEdit;
