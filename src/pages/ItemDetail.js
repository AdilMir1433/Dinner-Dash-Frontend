import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";

function ItemDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  const [itemDTO, setItemDTO] = useState({
    title: "",
    description: "",
    itemPhoto: "",
    price: 0.0,
    categoryID: [],
  });

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const getItem = async () => {
    const endpoint = `${API_BASE_URL}/items/get-item/${id}`;

    const result = await axios.get(endpoint);
    console.log(result.data.data);
    setItemDTO(result.data.data);
  };

  const addToCart = () => {
    // Update the UI to indicate that the item has been added to the cart
    // You can add the logic for managing the cart state in a separate context or store
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
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
      <div className="my-4">
        <button
          onClick={decrementQuantity}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={addToCart}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ItemDetail;
