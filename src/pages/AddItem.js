import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../apiConfig/APIConfig";
// const header = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json", // Set the content type if needed
//   },
// };

//LOGIN FIRST

function AddItem() {
  // Define state variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send a request to your API here with the form data
    const formData = { title, description, photo, price };
    console.log("Form data submitted:", formData);
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
            setImageURL(data.url);
            setImageFile(file);
            document.getElementById("image").style.display = "none";
          })
          .catch((error) => {
            toast.error("Error Uploading Image", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // const createToast = (message) => {
  //   toast.error(message, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: false,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
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
        <h2 className="text-2xl font-bold mb-4 text-orange-600">
          Add New Item
        </h2>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            accept="mage/png, image/jpeg"
            onChange={handleImageUpload}
          />
          {imageURL && (
            <img src={imageURL} alt="Uploaded" style={{ maxWidth: "100px" }} />
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
            type="number"
            placeholder="Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
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
}

export default AddItem;
