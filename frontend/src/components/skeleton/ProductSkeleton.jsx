function ProductSkeleton() {
  return (
    <div className=" h-full min-h-[250px]">
      <div className="h-[60%] animate-pulse bg-gray-400 rounded-md w-full"></div>
      <div className="h-[40%] ">
      <div className="h-5 my-1 animate-pulse bg-gray-400 rounded w-full"></div>
      <div className="flex my-1 justify-between gap-4">
        <div className="h-5 animate-pulse bg-gray-400 rounded w-full"></div>
        <div className="h-5 animate-pulse bg-gray-400 rounded w-full"></div>
      </div>
      <div className="h-5 animate-pulse bg-gray-400 rounded w-[60%]"></div>
      </div>
    </div>
  )
}

export default ProductSkeleton
