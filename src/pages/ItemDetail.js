import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";
import { useCart, useCartUpdate } from "../context/Context";
import { notification } from "antd";

function ItemDetail() {
  const { id } = useParams();
  //const [quantity, setQuantity] = useState(0);

  const cart = useCart();
  const updateCart = useCartUpdate();

  const [itemDTO, setItemDTO] = useState({
    title: "",
    description: "",
    itemPhoto: "",
    price: 0.0,
    categoryID: [],
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      // Apply inline style here
      message: (
        <span style={{ color: "orange", fontWeight: "bolder" }}>Noice</span>
      ),
      description: "Item Added To Cart Successfully!",
      placement,
    });
  };

  // const incrementQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const getItem = async () => {
    const endpoint = `${API_BASE_URL}/items/get-item/${id}`;

    const result = await axios.get(endpoint);
    console.log(result.data.data);
    setItemDTO(result.data.data);
  };

  const addToCart = () => {
    const existingItem = cart.find(
      (cartItem) => cartItem.title === itemDTO.title
    );

    if (existingItem) {
      // Item already exists in the cart, update its quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.title === itemDTO.title
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      updateCart(updatedCart);
    } else {
      // Item doesn't exist in the cart, add it
      updateCart([...cart, { ...itemDTO, quantity: 1 }]);
    }
    openNotification("topRight");
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      {contextHolder}
      <h1 className="text-2xl font-bold">{itemDTO.title}</h1>
      <img
        src={itemDTO.itemPhoto}
        alt={itemDTO.title}
        className="my-4 w-full"
      />
      <p className="text-gray-600">{itemDTO.description}</p>
      <p className="text-orange-600 font-bold text-xl my-2">
        <span className=" text-gray-700">RS</span> {itemDTO.price}
      </p>
      <button
        onClick={addToCart}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-400 animate-pulse"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ItemDetail;
