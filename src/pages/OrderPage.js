import React, { useEffect, useState } from "react";
import { useCart, useUserCart, useUserCartUpdate } from "../context/Context";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";

const OrderPage = () => {
  const cart = useCart();
  const userCart = useUserCart();
  const usetUserCart = useUserCartUpdate();

  const [cartItemIndex, setCartItemIndex] = useState(0);
  const [cartItem, setCartItem] = useState({
    cartByCartId: "",
    itemByItemId: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const prepareNextCartItem = () => {
    if (cartItemIndex < cart.length) {
      const item = cart[cartItemIndex];
      const preparedItem = {
        cartByCartId: userCart.id, // Set the appropriate cart ID
        itemByItemId: item.id, // Assuming item.id is the correct item ID
      };
      setCartItem(preparedItem);
      setCartItemIndex(cartItemIndex + 1);
    } else {
      // All cart items have been processed, you can now proceed to place the order
      sendCartItemToServer();
    }
  };

  // Function to send cartItem to the Spring Boot application
  // Function to send cartItem to the Spring Boot application
  const sendCartItemToServer = async () => {
    try {
      console.log(cartItem);
      const endpoint = `${API_BASE_URL}/cart_item/add-cart-item`; // Replace with your actual endpoint URL
      const response = await axios.post(endpoint, cartItem);
      if (response.data.responseCode === 0) {
        // Cart item successfully added to the server
        if (cartItemIndex < cart.length) {
          // Prepare and send the next cart item
          prepareNextCartItem();
        } else {
          // All cart items have been processed, you can now proceed to place the order
          alert("Order placed successfully!");
        }
      } else {
        // Handle error response from the server if needed
        alert("Failed to place the order. Please try again later.");
      }
    } catch (error) {
      // Handle any network or request error here
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (cartItemIndex === 0) {
      // Start processing the first cart item when the component mounts
      prepareNextCartItem();
    }
  }, [cart, userCart.id, cartItemIndex]); // Add cart, userCart.id, and cartItemIndex as dependencies

  // Render the cart items on the order page
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
            onClick={() => {
              // Handle the order placement logic here
              sendCartItemToServer();
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
