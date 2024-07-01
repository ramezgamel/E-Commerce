import { useGetUserWishListQuery } from "../../store/wishListApi";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
function WishList() {
  const { data: wishList, isLoading, isError } = useGetUserWishListQuery();
  if (isLoading) return (<div className="grid grid-cols-12 gap-2 h-full overflow-y-auto no-scrollbar">
    {Array.from({ length: 20 }).map(() =>
      <div key={Math.random()} className="col-span-4 md:col-span-3">
        <ProductSkeleton />
      </div>
    )}
  </div>);
  if(isError)return <div className="alert text-center py-2 my-10">Failed to get wish list items</div>
  return (
    <>
      { wishList?.data.length == 0 ? <div className="alert text-center my-auto">No data</div> :
        <div className="h-full overflow-auto no-scrollbar">
          <div className="grid grid-cols-12 gap-2">
            {wishList?.data.map(prd =>
              <div key={prd._id} className="col-span-6 md:col-span-4 lg:col-span-3">
                <Product product={prd} key={prd._id} isInWishList={true} />
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
}

export default WishList;
