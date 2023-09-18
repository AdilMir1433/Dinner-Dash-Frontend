import React, { useState, useEffect } from "react";
//import { data } from "../data/data";
import { useToken } from "../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";
import { Link } from "react-router-dom";

function Food() {
  const token = useToken();

  const [itemDTO, setItemDTO] = useState([]);
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([
    {
      id: "",
      categoryName: "",
      categoryPhoto: "",
    },
  ]);

  const getItems = async () => {
    try {
      const endpoint = `${API_BASE_URL}/items/get-items`;
      const res = await axios.get(endpoint);
      if (res.data.responseCode === 0) {
        console.log(res.data.data);
        setItemDTO(res.data.data.itemResponseDTOS);
        setData(res.data.data.itemResponseDTOS);
        console.log("items : ", itemDTO);
      } else {
        createToast("An Internal Error Occured");
      }
    } catch (error) {
      createToast("Error fetching Items");
    }
  };

  const getCategories = async () => {
    try {
      const endpoint = `${API_BASE_URL}/category/get-categories`;
      const res = await axios.get(endpoint, header);
      if (res.data.responseCode === 0) {
        setCategories(res.data.data);
        console.log("Categories : ", categories);
      } else {
        createToast("An Internal Error Occured");
      }
    } catch (error) {
      createToast("Error Fetching categories.");
    }
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  const [foods, setFoods] = useState(data);

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type if needed
    },
  };

  const filterType = (category) => {
    const filteredItems = itemDTO.filter((item) => {
      return item.categoryID.includes(category);
    });
    console.log(filteredItems);
    setItemDTO(filteredItems);
  };

  //Filter by price
  const filterPrice = (price) => {
    setFoods(
      data.filter((item) => {
        return item.price === price; // TODO: CHeck type
      })
    );
  };

  const createToast = (message) => {
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
  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
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
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>
      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Filter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            {/* Render category buttons dynamically */}

            <button
              onClick={() => setItemDTO(data)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filterType(category.categoryName)}
                className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>
        {/* Filter Price */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              onClick={() => filterPrice("$")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $
            </button>
            <button
              onClick={() => filterPrice("$$")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $$
            </button>
            <button
              onClick={() => filterPrice("$$$")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $$$
            </button>
            <button
              onClick={() => filterPrice("$$$$")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $$$$
            </button>
          </div>
        </div>
      </div>
      {/* display foods */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {itemDTO.map((item) => (
          <div
            key={item.id}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={item.itemPhoto}
              alt={item.title}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.title}</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  RS {item.price}
                </span>
              </p>
            </div>
            <Link
              className="btn btn-primary mx-2 mb-2"
              to={`/view-item/${item.id}`}
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;
