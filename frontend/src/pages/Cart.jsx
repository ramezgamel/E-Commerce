import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeItem } from '../store/cartSlice';
function Cart() {
  const dispatch = useDispatch();
  const {
    cartItems,
    itemsPrice,
    itemsQuantity,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);
  const updateCart = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      <h1 className="mb-2 text-main">Shopping Cart</h1>
      <div className="grid-cols-12 gap-3 md:grid">
        <div className="col-span-8">
          {cartItems.length == 0 ? (
            <div role="alert" className="alert">
              Cart is Empty
            </div>
          ) : (
            <div>
              {cartItems.map((i) => (
                <div
                  key={i?._id}
                  className="bd grid grid-cols-12 gap-2 border-b py-2"
                >
                  <div className="col-span-3">
                    <img
                      src={i?.image}
                      alt={i?.name}
                      className="h-full rounded-lg"
                    />
                  </div>
                  <div className="col-span-9">
                    <Link to={`/product/${i?._id}`}>{i?.name}</Link>
                    <p className="text-main">${i?.price}</p>
                    <div className="flex justify-between">
                      <input
                        className="w-50"
                        type="number"
                        defaultValue={i?.qty}
                        onChange={(e) => updateCart(i, Number(e.target.value))}
                      />
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleDelete(i?._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-4 h-fit p-2 shadow-lg">
          <div className="text-main">
            <h4>Subtotal ({itemsQuantity}) items</h4>
            <div className="flex justify-between">
              <strong>Price :</strong>${itemsPrice}
            </div>
            <div className="flex justify-between">
              <strong>Shipping :</strong>${shippingPrice}
            </div>
            <div className="flex justify-between">
              <strong>Tax :</strong>${taxPrice}
            </div>
            <hr />
            <div className="flex justify-between">
              <strong>Total :</strong>${totalPrice}
            </div>
          </div>
          <Link to="/shipping">
            <button
              type="button"
              className="btn mt-2 w-full"
              disabled={cartItems.length == 0}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
