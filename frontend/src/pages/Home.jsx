import { useGetProductQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from './ProductCarousel';
import { useState } from 'react';
import Tabs from '../components/Tabs';
import Features from "../components/Features"
function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [features, setFeatures] = useState('');
  const [sort, setSort] = useState('');
  const { data: products, isLoading, error } = useGetProductQuery({page, category, sort, features});
  if (isLoading) return <div className='h-full my-auto text-center'>  
    <Loader/>
  </div> ;
  if (error)
    return (
      <div role="alert" className="alert">
        Something went wrong
      </div>
    );
  return (
    <> 
      <div className='grid mt-7 grid-cols-12'>
        <aside className='hidden md:block md:col-span-2 shadow-md'>
          <Features setFeatures={setFeatures} sort={sort}  setSort={setSort}/>
        </aside>
        <div className='col-span-10'>
          <Tabs category={category} setCategory={setCategory}/>
          <main className='p-3'>
            <ProductCarousel />
            <h1 className="text-main mb-4">Latest Products</h1>
            <div className=" grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              {products?.pages > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <Paginate
                    pages={products?.totalPages}
                    pageNum={products?.page}
                    setPage={setPage}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      
    </>
  );
}

export default Home;
