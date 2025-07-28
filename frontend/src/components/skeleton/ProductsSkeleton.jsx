import ProductSkeleton from "./ProductSkeleton";

function ProductsSkeleton() {
  return (
    <div className="grid gap-3 grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 20 }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );
}

export default ProductsSkeleton;
