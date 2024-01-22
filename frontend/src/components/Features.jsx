
function  Features() {
  return (
    <form className="flex flex-col ml-2 sticky top-16 ">
      <div className="mb-2">
        <h2 className="text-main text-lg">Sort</h2>
        <div className="flex gap-2 ml-2">
        <input name="sort" className="w-fit" type="radio" id="name" value="name"/>
        <label htmlFor="name" className="m-0 text-sm">Name</label>
        </div>
        <div className="flex gap-2 ml-2">
        <input name="sort" className="w-fit" type="radio" id="price" value="price"/>
        <label htmlFor="price" className="m-0 text-sm">Price</label>
        </div>
        <div className="flex gap-2 ml-2">
        <input name="sort" className="w-fit" type="radio" id="rating" value="rating"/>
        <label htmlFor="rating" className="m-0 text-sm">Rating</label>
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
      <div className="mb-2">
        <h2 className="text-main text-lg">Filter</h2>
        <div className="text-center">
          <label >Price</label>
          <div className="flex gap-2">
            <input type="number" placeholder="from"/>
            <input type="number" placeholder="to"/>
          </div>
        </div>
        <div>
          <label htmlFor="">Brand</label>
          {}
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
    </form>
  )
}

export default Features