// import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from 'react';
import { useGetProductsFeaturesMutation } from '../store/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Model from './Modal';
import { AiOutlineSearch } from 'react-icons/ai';

const product = (item) => {
  return (
    <div className="grid grid-cols-12 p-2 gap-2 hover:cursor-pointer hover:bg-gray-500">
      <div className="col-span-3">
        <img
          className="rounded-md h-20 w-full"
          src={item.images[0]}
          alt={item.name}
        />
      </div>
      <div className="col-span-9">
        <p className='text-main mb-1'>{item.name}</p>
        <div className='flex justify-between'>
          <p className='text-main mb-1 text-sm'>{item.category.name}</p>
          <p className='text-main mb-1 text-sm'>{item.price}</p>
        </div>
      </div>
    </div>
  );
};

const SearchBox = memo(function SearchBox() {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchProducts, { data, isLoading }] = useGetProductsFeaturesMutation();
  const onSearch = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    searchProducts({ keyword });
  }, [keyword, searchProducts]);

  document.addEventListener('click', () => {
    setKeyword('');
  });
  return (
    <>
      <Model show={show} header="Search" setShow={setShow}>
        <div className='h-[60vh]'>
          <form className='mb-2'>
            <input
              type="text"
              name="q"
              placeholder="Search..."
              onChange={onSearch}
              className="mr-sm-2 ml-sm-5"
            ></input>
          </form>
          {keyword != '' && (
            <div className='pb-5 overflow-y-scroll no-scrollbar h-full '>
              {isLoading ? <div className="content-center h-full"> <Loader /> </div>: data?.data?.length > 0 ? data.data.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    onClick={() => setKeyword('')}
                  >
                    {product(item)}
                  </Link>
                )) :  <div className='flex items-center justify-center h-full'>
                    <div className="alert px-8 py-4">No Data!</div>
                  </div>}
            </div>
          )}
        </div>
      </Model>
      <div className='relative' >
        <input type="text" className='h-7 hidden sm:block sm:w-44' id='search' onClick={() => setShow(true)} placeholder='Search..' />
        <label htmlFor="search" className=' absolute top-1/2 -translate-y-1/2 right-1'>
          <AiOutlineSearch className=' text-main w-5 h-5 hover:cursor-pointer' />
        </label>
      </div>
    </>
  );
});

export default SearchBox;
