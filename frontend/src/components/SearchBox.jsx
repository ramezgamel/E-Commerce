// import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from 'react';
import { useGetProductsFeaturesMutation } from '../store/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from './Loader';

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
  )
}

const SearchBox = memo(function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [searchProducts, { data, isLoading }] = useGetProductsFeaturesMutation();
  const onSearch = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(()=>{
    searchProducts({ keyword });
  },[keyword, searchProducts]);

  document.addEventListener('click', () => {
    setKeyword('');
  });
  return (
    <div className='h-[60vh]'>
      <form >
        <input
          type="text"
          name="q"
          placeholder="Search..."
          onChange={onSearch}
          className="mr-sm-2 ml-sm-5"
        ></input>
      </form>
      {keyword != '' && (
          <div className='mt-2 overflow-y-scroll h-full content-center'>
            {isLoading && <Loader/>}
            {(!isLoading && data?.data?.length == 0 ) && <div className='alert text-center '>No Data</div> }
            {data?.data?.length > 0 && 
              data.data.map((item) =>  (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  onClick={() => setKeyword('')}
                >
                  {product(item)}
                </Link>
              ))
            }
          </div>
        )}
    </div>
  );
})

export default SearchBox;
