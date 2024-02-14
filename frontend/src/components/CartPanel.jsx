import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem } from '../store/cartSlice';

function CartPanel() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
    const handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <div className='relative mr-1'>
          <AiOutlineShoppingCart
            className=" h-7 w-7 text-main cursor-pointer hover:text-violet-600"
            onClick={() => setOpen(true)}
          />
          {cartItems?.length > 0 && (
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800">{cartItems?.length}</div>
            )}  
        </div>
        <Transition.Root show={Boolean(open)} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"s
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className='fixed inset-0 overflow-auto '>
              <div className="pointer-events-none fixed h-full inset-y-0 right-0 max-w-full">
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-xs mt-16 h-full bg-white overflow-auto"> 
                      <div className="flex justify-between pt-4 px-4 border-b bd">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <hr />
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">
                                  Close panel
                                </span>
                                <AiOutlineClose
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                      </div>
                      <div className="p-4 overflow-auto 
                      h-[55vh]">
                        {cartItems?.length > 0 ? (
                                <ul
                                  role="list"
                                  className="p-0"
                                >
                                  {cartItems?.map((item) => (
                                    <li
                                      key={item._id}
                                      className="grid grid-cols-12 gap-1 mb-2"
                                    >
                                      <div className="col-span-4 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          src={item.images[0]}
                                          alt={item.name}
                                          className="h-16 w-full object-cover object-center"
                                        />
                                      </div>
                                      <div className="col-span-8">
                                        <p>
                                          <Link
                                              to={`/product/${item._id}`}
                                            >
                                              {item.name.slice(0,37)}
                                            </Link>
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                          <p className="text-gray-500 first-letter my-auto">
                                            Qty {item.qty}
                                          </p>
                                          <p className='my-auto'>
                                              {item.price}
                                            </p>
                                          <button
                                              type="button"
                                              className="bg-red-500 py-1 px-2 rounded-md hover:bg-red-600"
                                              onClick={() =>
                                                handleDelete(item?._id)
                                              }
                                            >
                                              <BsFillTrashFill className='text-white'/>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                        ) : (
                          <div className="alert px-3 py-2 text-center">No Items</div>
                        )}
                      </div>
                      <div className="border-t border-gray-200 p-4 text-center">
                          <div>
                            <Link
                              to="/cart"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </Link>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              <span>or </span>
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                  </p>
                                </div>
                            </div>
                          </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
    </>
  )
}

export default CartPanel
