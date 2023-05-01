import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreseCart,
  getTotal,
  removeFromCart,
} from "../features/slices/CartSlice";
import { useEffect } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispach = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispach(getTotal());
  }, [cart, dispach]);
  const handledRemoveCart = (cartItem) => dispach(removeFromCart(cartItem));
  const handledecreseCart = (cartitem) => dispach(decreseCart(cartitem));
  const handledEncreaseQuantity = (cartItem) => dispach(addToCart(cartItem));
  const handledClearCart = () => dispach(clearCart());
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quanity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartitem) => (
              <div key={cartitem.id} className="cart-item">
                <div className="cart-product">
                  <img src={cartitem.image} alt={cartitem.name} />
                  <div>
                    <h3>{cartitem.name}</h3>
                    <p>{cartitem.description}</p>
                    <button onClick={() => handledRemoveCart(cartitem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartitem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handledecreseCart(cartitem)}>-</button>
                  <div className="count">{cartitem.Quantity}</div>
                  <button onClick={() => handledEncreaseQuantity(cartitem)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  ${cartitem.price * cartitem.Quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handledClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>SubTotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>taxes and shipping calculated at checkout</p>
              {auth._Id ? (
                <button>Check Out</button>
              ) : (
                <button
                  className="cart-login"
                  onClick={() => {
                    navigate("/login", { replace: true });
                  }}
                >
                  Login to Check Out
                </button>
              )}

              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
