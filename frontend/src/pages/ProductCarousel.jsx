import { useState } from 'react';
import Loader from '../components/Loader';
import { useGetTopProductsQuery } from '../store/productsApiSlice';
function ProductCarousel() {
  const [view, setView] = useState(0);
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;
  if (error) return <h3 role="alert">{error?.data?.message}</h3>;
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      {/* <!-- Carousel wrapper --> */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* <!-- Item 1 --> */}
        {products.map((prd, i) => (
          <div
            key={prd._id}
            className="hidden duration-700 ease-in-out"
            data-carousel-item
          >
            <img
              src={import.meta.env.VITE_BASE_URL + prd.images[0]}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              alt={prd.name}
            />
          </div>
        ))}
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute bottom-5 left-1/2  flex -translate-x-1/2 space-x-3 ">
        {products?.map((prd, index) => (
          <button
            key={index}
            type="button"
            className="h-3 w-3 border-separate rounded-full border-2 border-slate-50 hover:bg-slate-50"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      <button
        type="button"
        className="group absolute left-0 top-0  flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-prev
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
        className="group absolute right-0 top-0  flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-next
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

    // <Carousel pause="hover" classNameName="bg-primary mb-4">
    //   {products.map((prd) => (
    //     <Carousel.Item key={prd._id}>
    //       <Link to={`/product/${prd._id}`}>
    //         <Image
    //           src={import.meta.env.VITE_BASE_URL + prd.image}
    //           alt={prd.name}
    //           fluid
    //         />
    //         <Carousel.Caption classNameName="carousel-caption">
    //           <h2>
    //             {prd.name} ({prd.price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  );
}

export default ProductCarousel;
