import React from "react";
import EmptyCart from "../images/empty-cart.gif";
import { useCart, useCartUpdate, useLogin } from "../context/Context";
import { notification } from "antd";

import { useNavigate } from "react-router-dom";

const CartSideDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = useLogin();
  const [api, contextHolder] = notification.useNotification();
  const cart = useCart();
  const updateCart = useCartUpdate();

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    updateCart(updatedCart);
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item);
    } else {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      updateCart(updatedCart);
    }
  };

  const openNotification = (placement) => {
    api.info({
      message: (
        <span style={{ color: "orange", fontWeight: "bolder" }}>Noice</span>
      ),
      description: "Login First to place An Order.",
      placement,
    });
  };

  const handleOrderClick = () => {
    if (isLoggedIn) {
      // User is logged in, navigate to /order
      navigate("/order");
    } else {
      // User is not logged in, show a notification and navigate to the login screen
      openNotification("topRight");
      navigate("/auth");
    }
  };

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const renderCartItems = () => {
    if (!Array.isArray(cart)) {
      return [];
    }
    return cart.map((item) => (
      <div key={item.id} className="flex items-center justify-between mb-4">
        <div className="flex items-center w-3/4">
          {" "}
          {/* Adjust the width of the item */}
          <img
            src={item.itemPhoto}
            alt={item.title}
            className="w-16 h-16 mr-4"
          />
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <div className="flex items-center mt-2">
              {" "}
              {/* Move this div below the description */}
              <button
                onClick={() => updateQuantity(item, item.quantity - 1)}
                className="bg-orange-600 text-white px-2 py-1 rounded-full"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item, item.quantity + 1)}
                className="bg-orange-600 text-white px-2 py-1 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="text-right w-1/4">
          {" "}
          {/* Adjust the width of this div */}
          <p className="text-orange-600 font-bold">
            <span className="text-gray-700">RS</span>{" "}
            {item.price * item.quantity}
          </p>
          <button
            onClick={() => removeFromCart(item)}
            className="text-red-600 hover:text-red-800 mt-2"
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-[300px] bg-white z-10 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {contextHolder}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Close
        </button>
      </div>
      <div className="p-4">
        {cart.length === 0 ? (
          <div className="text-center">
            <img
              src={EmptyCart} // Replace with your empty cart image
              alt="Empty Cart"
              className="w-32 mx-auto mb-4"
            />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div>
            {renderCartItems()}
            <div className="mt-4">
              <p className="text-orange-600 font-bold text-xl">
                Total: <span className="text-gray-700">RS</span> {total}
              </p>
            </div>
            <button
              onClick={handleOrderClick}
              className="bg-orange-600 text-white px-4 py-2"
            >
              Place an Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSideDrawer;
