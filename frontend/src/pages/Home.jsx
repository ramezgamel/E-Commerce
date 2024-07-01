import { useGetProductQuery } from '../store/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useState } from 'react';
import Tabs from '../components/Tabs';
import { useSelector } from 'react-redux';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import {AnimatePresence, motion as m} from "framer-motion" ;
import { childVariants, containerVariants } from '../animation/variants';
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
      <Tabs category={category} setCategory={setCategory} setPage={setPage}/>
      <main className='p-3'>
        {!category && <ProductCarousel /> }
        <h1 className="text-main mb-4">{!category&& "Latest Products"}</h1>
          {isLoading && <div className="grid gap-3 grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            { Array.from({ length: 20 }).map((_,i) => <ProductSkeleton key={i}/>)}
          </div>}
          {products?.data.length > 0 ? (
            <AnimatePresence mode='popLayout'>
              <m.div key={category} variants={containerVariants} initial='hidden' animate="show" exit="exit" className="grid gap-3 grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-hidden">
                {products?.data?.map((product, i) => (
                  <m.div variants={childVariants} key={i}>
                    <Product product={product} isInWishList={favorite?.some(item => product._id === item._id)} isInCart={cart?.cartItems?.some(item => item.product._id == product._id)} />
                  </m.div>
                ))}
              </m.div>
            </AnimatePresence>
          ) : (
            <div role="alert" className="alert">
              No Data to Show
            </div>
          )}
        <div className="text-center">
          {products?.paginationResult.totalPages > 1 && (
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
