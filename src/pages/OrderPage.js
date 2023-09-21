import React, { useEffect, useState } from "react";
import { useCart, useUserCart } from "../context/Context";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderPage = () => {
  const cart = useCart();
  const userCart = useUserCart();

  const [cartItemIndex, setCartItemIndex] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [cartItem, setCartItem] = useState({
    cartByCartId: "",
    itemByItemId: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const createSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const createErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const sendCartItemToServer = async (item) => {
    try {
      console.log(item);
      const endpoint = `${API_BASE_URL}/cart_item/add-cart-item`;
      const response = await axios.post(endpoint, item);
      if (response.data.responseCode === 0) {
        createSuccessToast("Item added successfully!");
      } else {
        createErrorToast("Error Placing Order");
      }
    } catch (error) {
      createErrorToast("Masla ho gaya");
    }
  };

  const handlePlaceOrderClick = async () => {
    if (!processing) {
      setProcessing(true);
      for (const item of cart) {
        const preparedItem = {
          cartByCartId: userCart.id,
          itemByItemId: item.id,
        };
        await sendCartItemToServer(preparedItem);
      }
      setProcessing(false);
      createSuccessToast("Order Placed successfully!");
    }
  };

  const renderCartItems = () => {
    return cart.map((item) => (
      <div key={item.id} className="mb-4 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={item.itemPhoto}
              alt={item.title}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
          <p className="text-orange-600 font-bold">
            <span className="text-gray-700">RS</span>{" "}
            {item.price * item.quantity}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <p className="mr-4">Quantity: {item.quantity}</p>
          <p className="mr-4">
            Subtotal: <span className="text-gray-700">RS</span>{" "}
            {item.price * item.quantity}
          </p>
        </div>
      </div>
    ));
  };
  return (
    <div className="max-w-xl mx-auto p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {renderCartItems()}
          <div className="mt-4">
            <p className="text-orange-600 font-bold text-xl">
              Total: <span className="text-gray-700">RS</span> {total}
            </p>
          </div>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handlePlaceOrderClick}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
