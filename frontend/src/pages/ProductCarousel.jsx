import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useGetTopProductsQuery } from '../store/productsApiSlice';
import {AnimatePresence, motion as m} from "framer-motion"
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io"
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
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  },[products, view]);
  const prev = ()=> {
    setView(curr => curr === 0 ? products.length -1: curr -1)
  };
  const next = () => {
    setView(curr=> curr === products.length -1 ? 0: curr +1)
  };
  if (isLoading) return <Loader />;
  if (error) return <h3 role="alert">{error?.data?.message}</h3>;
  return (
    <div className="relative overflow-hidden pb-10  " >
      {/* <!-- Carousel wrapper --> */}
      <AnimatePresence mode='wait'>
        <m.div
          key={view}
          initial={{x:"-100%"}}
          animate={{x:0,opacity:["10%","30%","100%"]}}
          exit={{x:"100%", opacity:["70%","30%","10%"]}}
          transition={{
            duration:.5
          }}
          className="h-56 flex justify-center md:h-80">
            <img src={products[view].images[0]}/>
        </m.div>
      </AnimatePresence>
      {/* <!-- Slider controls --> */}
      <div className='absolute inset-0 flex justify-between items-center p-4'>
        <button type="button"
          className='hover:scale-150 transition-all'
          onClick={prev}>
          <IoIosArrowBack className='w-7 h-7 text-main hover:text-blue-700'/>
        </button>
        <button type="button" onClick={next} className='hover:scale-150 transition-all'>
          <IoIosArrowForward className='w-7 h-7 text-main hover:text-blue-700'/>
        </button>
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute w-full left-0 bottom-3 text-center">
        <div className='flex justify-center items-center gap-2'>
          {products?.map((prd, index) => (
            <button
              key={index}
              type="button"
              className={`${view == index ? "p-2":"opacity-50"} h-3 w-3 rounded-full transition-all bg-main`}
              onClick={()=>setView(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
