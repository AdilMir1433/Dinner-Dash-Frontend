import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig/APIConfig";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

const UserOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/order/get-order/${id}`
        );
        const userOrders = response.data.data;
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
              <p>Order Time: {order.orderTime}</p>
              <p>Status: {order.status}</p>
              <p>Cart ID: {order.cartID}</p>
              <h3 className="text-lg font-semibold mt-2">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="ml-4">
                    <div className="flex items-center">
                      <img
                        src={item.itemPhoto}
                        alt={item.title}
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-orange-600 font-bold">
                          Price: RS {item.price}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
