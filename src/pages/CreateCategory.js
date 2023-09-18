import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../apiConfig/APIConfig";
import axios from "axios";
import { useToken, useLogin } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function CreateCategory() {
  const isloggedIn = useLogin();
  const token = useToken();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [categoryDTO, setCategoryDTO] = useState({
    categoryName: "",
    categoryPhoto: "",
  });

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type if needed
    },
  };

  const onInputChange = (e) => {
    setCategoryDTO({ ...categoryDTO, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `${API_BASE_URL}/category/create`;
      const res = await axios.post(endpoint, categoryDTO, header);
      if (res.data.responseCode === 0) {
        console.log(categoryDTO);
        success();
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } else {
        createToast("Error Saving Data");
      }
    } catch (error) {
      createToast("An error occurred while Creating Category.");
    }

    console.log(categoryDTO);
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
            setCategoryDTO({ ...categoryDTO, categoryPhoto: data.url });
            document.getElementById("photo").style.display = "none";
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

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Category created Successfully!!",
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
        <h2 className="text-2xl font-bold mb-4 text-orange-600">
          Create a New Category
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoryName"
            >
              Category Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categoryName"
              type="text"
              placeholder="Category Name"
              value={categoryDTO.categoryName}
              name="categoryName"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Category Item Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
            {categoryDTO.categoryPhoto && (
              <img
                src={categoryDTO.categoryPhoto}
                alt="Uploaded"
                style={{ maxWidth: "100px" }}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    createToast("Login First!");
    navigate("/auth");
  }
}

export default CreateCategory;
