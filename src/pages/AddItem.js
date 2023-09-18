import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";
import { useToken, useLogin } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddItem() {
  const token = useToken();

  const isloggedIn = useLogin();

  const [itemDTO, setItemDTO] = useState({
    title: "",
    description: "",
    itemPhoto: "",
    price: 0.0,
    categoryID: [],
  });

  const [categories, setCategories] = useState([
    {
      id: "",
      categoryName: "",
      categoryPhoto: "",
    },
  ]);

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item Saved Successfully!!",
    });
  };

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type if needed
    },
  };

  const handleCategoryChange = (categoryId) => {
    // Check if the category is already selected
    const isCategorySelected = itemDTO.categoryID.includes(categoryId);

    // If selected, remove it; otherwise, add it
    if (isCategorySelected) {
      setItemDTO({
        ...itemDTO,
        categoryID: itemDTO.categoryID.filter((id) => id !== categoryId),
      });
    } else {
      setItemDTO({
        ...itemDTO,
        categoryID: [...itemDTO.categoryID, categoryId],
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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

  const onInputChange = (e) => {
    setItemDTO({ ...itemDTO, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemDTO.categoryID.length === 0) {
      createToast("Please select at least one category.");
      return;
    }
    console.log("Items : ", itemDTO);
    try {
      const endpoint = `${API_BASE_URL}/items/save`;
      const res = await axios.post(endpoint, itemDTO, header);
      if (res.data.responseCode === 0) {
        console.log(itemDTO);
        success();
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } else {
        createToast("Error Saving Data");
      }
    } catch (error) {
      createToast("An error occurred while Creating Data.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const data = new FormData();

        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "");
        fetch("https://api.cloudinary.com/v1_1/dn9ugl96j/image/upload", {
          method: "post",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            setItemDTO({ ...itemDTO, itemPhoto: data.url });
            document.getElementById("image").style.display = "none";
          })
          .catch((error) => {
            createToast("Error Uploadig Image!");
          });
      } catch (error) {
        createToast("Error uploading image:", error);
      }
    }
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

  if (isloggedIn) {
    return (
      <div className="max-w-lg mx-auto mt-8 p-4">
        {contextHolder}
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /> */}
          <span className="text-2xl font-bold mb-5 text-orange-600">
            Add New Item
          </span>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Item Title"
              name="title"
              value={itemDTO.title}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Item Description"
              value={itemDTO.description}
              name="description"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-4 flex items-center flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Item Photo
            </label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
            {itemDTO.itemPhoto && (
              <img
                src={itemDTO.itemPhoto}
                alt="Uploaded"
                style={{ maxWidth: "100px" }}
              />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="price"
              type="number"
              placeholder="Item Price"
              value={itemDTO.price}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-orange-600 text-sm font-bold mb-2"
              htmlFor="categories"
            >
              Select Categories
            </label>
            <div>
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  <input
                    type="checkbox"
                    value={category.id}
                    checked={itemDTO.categoryID.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  {category.categoryName}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    createToast("Login First");
    navigate("/auth");
  }
}

export default AddItem;
