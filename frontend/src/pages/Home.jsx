import { useGetProductQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from './ProductCarousel';
import { useState } from 'react';
import Tabs from '../components/Tabs';
import { useSelector } from 'react-redux';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const { cart,favorite } = useSelector(state => state.offline);
  const { data: products, isLoading, error } = useGetProductQuery({ page, category });
  if (error)
    return (
      <div role="alert" className="alert">
        Something went wrong
      </div>
    );
  return (
    <div className='md:container md:mx-auto'>
      <Tabs category={category} setCategory={setCategory} />
      <main className='p-3'>
        <ProductCarousel />
        <h1 className="text-main mb-4">Latest Products</h1>
        <div className="grid gap-3 grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {
            isLoading && Array.from({ length: 20 }).map(() =>
              <div key={Math.random()} >
                <ProductSkeleton />
              </div>
            )
          }
          {products?.data.length > 0 ? (
            products?.data?.map((product) => (
              <div key={product._id}>
                <Product product={product} isInWishList={favorite?.some(item => product._id === item._id)} isInCart={cart?.cartItems?.some(item => item.product._id == product._id)} />
              </div>
            ))
          ) : (
            <div role="alert" className="alert">
              No Data to Show
            </div>
          )}
        </div>
        <div className="text-center">
          {products?.paginationResult.totalPages > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Paginate
                pages={products?.paginationResult.totalPages}
                pageNum={products?.paginationResult.currentPage}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
