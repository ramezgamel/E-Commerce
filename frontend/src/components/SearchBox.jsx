// import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useGetProductsFeaturesMutation } from '../store/productsApiSlice';
import { Link } from 'react-router-dom';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [searchProducts, { data }] = useGetProductsFeaturesMutation();
  const onSearch = (e) => {
    setKeyword(e.target.value);
    searchProducts({ keyword });
  };
  document.addEventListener('click', () => {
    setKeyword('');
  });
  return (
    <>
      <form className="position-relative">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          onChange={onSearch}
          className="mr-sm-2 ml-sm-5"
        ></input>
        {data?.result.length > 0 && keyword != '' && (
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,.7)',
              zIndex: 500,
              overflow: 'scroll',
              height: '400px',
            }}
            className="position-absolute w-100"
          >
            {data?.result.length > 0 &&
              data?.result?.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  onClick={() => setKeyword('')}
                >
                  <div className="grid grid-cols-12 p-2">
                    <div className="col-span-3">
                      <img
                        className="rounded-md"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="col-span-9">
                      <p style={{ color: 'white' }}>{item.name.slice(0, 30)}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </form>
    </>
  );
}

export default SearchBox;
