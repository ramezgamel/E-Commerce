import { useGetProductQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from './ProductCarousel';
import { useState } from 'react';
function Home() {
  const [page, setPage] = useState(1);
  const { data: products, isLoading, error } = useGetProductQuery(page);
  if (isLoading) return <Loader />;
  if (error)
    return (
      <div role="alert" className="alert">
        Something went wrong
      </div>
    );
  return (
    <>
      <ProductCarousel />
      <h1 className="text-main">Latest Products</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.result.length > 0 ? (
          products?.result?.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))
        ) : (
          <div role="alert" className="alert">
            No Data to Show
          </div>
        )}
      </div>
      <div className="text-center">
        {products?.result.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <Paginate
              pages={products?.totalPages}
              pageNum={products?.page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
