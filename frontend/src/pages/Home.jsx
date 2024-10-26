import { useGetProductQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useState } from 'react';
import Tabs from '../components/Tabs';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import Reveal from '../animation/Reveal';
function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const { data: products, isLoading, error } = useGetProductQuery({ page, category });
  if (error)
    return (
      <div role="alert" className="h-[75vh] flex items-center justify-center">
        <div className="alert py-5 px-10">
          Something went wrong!
        </div>
      </div>
    );
  return (
    <div className='md:container md:mx-auto'>
      <Tabs category={category} setCategory={setCategory} setPage={setPage}/>
      <main className='p-3'>
        {!category && <ProductCarousel /> }
        <h1 className="text-main mb-4">{!category&& "Latest Products"}</h1>
          {isLoading && <div className="grid gap-3 grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            { Array.from({ length: 20 }).map((_,i) => <ProductSkeleton key={i}/>)}
          </div>}
          {products?.data.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-hidden">
              {products?.data?.map((product, i) => (
                  <Reveal  key={i}>
                    <Product product={product} />
                  </Reveal>
                ))}
            </div>
          ) : (
            <div role="alert" className="alert">
              No Data to Show
            </div>
          )}
        <div className="text-center">
          {(products?.results >= import.meta.env.VITE_LIMIT || products?.paginationResult.currentPage > 1 ) && products?.paginationResult.totalPages > 1 && (
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
