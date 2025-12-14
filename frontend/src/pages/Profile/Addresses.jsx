import { FaPlus, FaTrash } from "react-icons/fa";
import { useAddToAddressesMutation, useDeleteFromAddressesMutation, useGetUserAddressesQuery } from "../../store/addressesApiSlice";
import { toast } from "sonner";
import Loader from "../../components/common/Loader";

function Addresses() {
  const { data: addresses, isLoading: addressesLoading } = useGetUserAddressesQuery();
  const [removeAddress, { isLoading: deleteLoading }] = useDeleteFromAddressesMutation();
  const [addAddress, { isLoading: addLoading }] = useAddToAddressesMutation();
  const deleteAddress = async (addressId) => {
    try {
      await removeAddress(addressId).unwrap();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  const addNewAddress = async (e) => {
    e.preventDefault();
    const { alias, details } = e.target;
    try {
      await addAddress({
        alias: alias.value,
        details: details.value,
      }).unwrap();
      toast.success("Added Address");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  if (addressesLoading) return <Loader />;
  return (
    <div className="lg:mt-6 lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto">
      <label className="mb-5 text-2xl font-extrabold text-center dark:text-gray-300">Addresses</label>
      {addresses?.data.map(ad =>
        <div className="flex items-center px-4 my-4" key={ad._id}>
          <div className="font-bold w-16 pr-2 border-r border-gray-600 text-main" >{ad.alias}</div>
          <div className="ml-2 flex flex-grow text-main justify-between items-center">
            {ad.details}
            {deleteLoading ? <Loader /> :
              <FaTrash disabled={deleteLoading} onClick={() => deleteAddress(ad._id)} className="text-gray-600 cursor-pointer" />
            }
          </div>
        </div>)}
      <form className="flex gap-2 mt-5" onSubmit={addNewAddress}>
        <input required className="w-[30%]" name="alias" type="text" placeholder="Alias" />
        <input required className="w-[70%]" name="details" type="text" placeholder="Address details" />
        <button type="submit" disabled={addLoading} className="btn">{addLoading ? <Loader /> : <FaPlus />}</button>
      </form>
    </div>
  );
}

export default Addresses;
