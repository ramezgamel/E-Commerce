import { useGetProductQuery } from '../store/productsApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import Tabs from '../components/Tabs';
import ProductsSwiper from '../components/ProductsSwiper';
import { useGetCatsQuery } from '../store/catApiSlice';
import Product from '../components/Product';
import Reveal from "../animation/Reveal";
import Paginate from "../components/Paginate";
import Error from '../components/Error';
import ProductsSkeleton from '../components/skeleton/ProductsSkeleton';
import useQueryParams from '../hooks/useQueryParams';
function Home() {
  const { params, addParam } = useQueryParams();
  const { data: products, isLoading, error } = useGetProductQuery(params ? params : { page: 1 }, { refetchOnMountOrArgChange: true });
  const { data } = useGetCatsQuery(1);

  if (error) return <Error />;
  if (isLoading) return <ProductsSkeleton />;

  return (
    <div className='md:container md:mx-auto'>
      <Tabs />
      <main className='p-3'>
        {!params?.category && <ProductCarousel />}

        {!params?.category ? <ProductsList products={data?.data} /> :
          (products?.data.length > 0 ? (<>
            <h1 className="text-main mb-4">{!params?.category && "Latest Products"}</h1>
            <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-hidden no-scrollbar">
              {products?.data?.map((product, i) => (
                <Reveal key={i}>
                  <Product product={product} />
                </Reveal>
              ))}
            </div>
            <div className="text-center">
              {(products?.results >= import.meta.env.VITE_LIMIT || products?.paginationResult.currentPage > 1) && products?.paginationResult.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Paginate
                    pages={products?.paginationResult.totalPages}
                    pageNum={products?.paginationResult.currentPage}
                    setPage={() => addParam('page', 1)}
                  />
                </div>
              )}
            </div>
          </>
          ) : (
            <div role="alert" className="alert">
              No Data to Show
            </div>
          ))}
      </main>
    </div>
  );
}

const ProductsList = ({ products }) => {
  return <>
    {(products?.map(cat => (
      <div key={cat._id}>
        <ProductsSwiper category={cat} />
      </div>
    )))}
  </>;
};

export default Home;
