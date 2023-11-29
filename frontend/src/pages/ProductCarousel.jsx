import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useGetTopProductsQuery } from '../store/productsApiSlice';
function ProductCarousel() {
  const [view, setView] = useState(0);
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(view == products?.length -1){
        setView(0)
      }else {
        setView(prev => prev + 1)
      }
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  },[products, view])
  if (isLoading) return <Loader />;
  if (error) return <h3 role="alert">{error?.data?.message}</h3>;
  return (
    <div
      id="default-carousel"
      className="relative w-full mb-5"
    >
      {/* <!-- Carousel wrapper --> */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {products.map((prd, i) => (
          <div
            key={prd._id}
            className={`${i != view ?"hidden":""} duration-700 ease-in-out`}
          >
            <img
              src={prd.images[0]}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2 text-main"
              alt={prd.name}
            />
          </div>
        ))}
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute -bottom-5 left-1/2  flex -translate-x-1/2 space-x-3 ">
        {products?.map((prd, index) => (
          <button
            key={index}
            type="button"
            className={`${view == index ? "bg-slate-50":""} h-3 w-3 border-separate rounded-full border-2 border-slate-50 hover:bg-slate-50`}
            onClick={()=>setView(index)}
          ></button>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      <button
        type="button"
        className="group absolute left-0 top-0  flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none disabled:cursor-not-allowed"
        onClick={()=>setView(prev=>prev - 1)}
        disabled={view == 0}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="group absolute right-0 top-0  flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none disabled:cursor-not-allowed"
        onClick={()=>setView(prev=>prev + 1)}
        disabled={view == products.length -1}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default ProductCarousel;
