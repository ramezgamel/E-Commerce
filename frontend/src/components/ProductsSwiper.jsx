import { useGetProductQuery } from "../store/productsApiSlice";
import Product from "./Product";

const ProductsSwiper = ({ category }) => {
  const { data: products } = useGetProductQuery({ page: 1, category: category._id });
  return (
    <div >
      <h3 className="my-4 text-2xl font-bold ">{category.name}</h3>
      <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
        {products?.data.map(p => <div key={p._id} className="min-w-[256px] w-64"> <Product product={p} /> </div>)}
      </div>
    </div>
  );
};
export default ProductsSwiper;
