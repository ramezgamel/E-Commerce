import { useRef } from "react";

/* eslint-disable react/prop-types */
function  Features({setFeatures, setSort}) {
  const fromRef = useRef()
  const toRef = useRef();

  const submitForm = (e) => {
  const from = fromRef.current.value;
  const to = toRef.current.value;

    e.preventDefault();
    setFeatures(`${from && `&price[gte]=${from}`}${to && `&price[lte]=${to}`}`) ;
  }
  return (
    <form onSubmit={submitForm} className="flex flex-col ml-2 sticky top-16 ">
      <div className="mb-2">
        <h2 className="text-main text-lg">Sort</h2>
        <div className="flex gap-2 ml-2">
        <input onClick={(e)=>setSort(e.target.value)} className="w-fit" type="radio" name="sort" id="name" value="name"/>
        <label htmlFor="name" className="m-0 text-sm">Name</label>
        </div>
        <div className="flex gap-2 ml-2"> 
        <input onClick={(e)=>setSort(e.target.value)} className="w-fit" type="radio" name="sort" id="price" value="price"/>
        <label htmlFor="price" className="m-0 text-sm">Price</label>
        </div>
        <div className="flex gap-2 ml-2">
        <input onClick={(e)=>setSort(e.target.value)} className="w-fit" type="radio" name="sort" id="rating" value="rating"/>
        <label htmlFor="rating" className="m-0 text-sm">Rating</label>
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
      <div className="mb-2">
        <h2 className="text-main text-lg">Filter</h2>
        <div className="text-center">
          <label >Price</label>
          <div className="flex gap-2">
            <input ref={fromRef} type="number" placeholder="from"/>
            <input ref={toRef} type="number" placeholder="to"/>
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
      <button className="btn" type="submit">Apply</button>
    </form>
  )
}

export default Features