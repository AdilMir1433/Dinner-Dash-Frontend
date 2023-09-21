import React, { useState } from "react";
import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import {
  MdHelp,
  MdFavorite,
  MdCreate,
  MdSync,
  MdLocalPizza,
  MdDelete,
  MdLogout,
  MdLogin,
} from "react-icons/md";
import {
  useLogin,
  useTokenUpdate,
  useUser,
  useUserUpdate,
} from "../context/Context";
import { useNavigate } from "react-router-dom";
import CartSideDrawer from "./CartSideDrawer";

function Navbar() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const user = useUser();
  const isLoggedIn = useLogin();
  const [isCartOpen, setCartOpen] = useState(false);

  const role = user.role;
  const setUser = useUserUpdate();
  const setToken = useTokenUpdate();

  const naviagate = useNavigate();

  const addItem = () => {
    navigate("/add-item");
  };

  const createCategory = () => {
    navigate("/add-category");
  };
  const viewOrders = () => {
    navigate(`/user-order/${user.id}`);
  };

  const generateRandomName = () => {
    const randomSuffix = Math.floor(Math.random() * 9999);
    const storedName = localStorage.getItem("guestName");
    if (storedName) {
      return storedName;
    }
    const name = `Guest${randomSuffix}`;
    localStorage.setItem("guestName", name);
    return name;
  };

  const auth = () => {
    setUser(null);
    setToken(null);
    naviagate("/auth");
  };
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg";

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      {/* {left side} */}
      <div className="flex items-center">
        <div className="cursor-pointer">
          <AiOutlineMenu onClick={() => setNav(!nav)} size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Roti <span className="font-bold">Scnz</span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2 m-0">Delivery</p>
          <p className="p-2 m-0">Pickup</p>
        </div>
      </div>
      {/* search bar */}

      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 focus:outline-none w-full"
          type="text"
          placeholder="Search Foods"
        />
      </div>

      {/* Cart button */}
      <button
        className="bg-black text-white hidden md:flex items-center py-2 rounded-full"
        onClick={() => setCartOpen(!isCartOpen)}
      >
        <BsFillCartFill size={20} className="mr-2" />
        Cart
      </button>
      <CartSideDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={[]}
      />

      {/* Mobile Menu */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left -0"></div>
      ) : (
        ""
      )}
      {/* Side drawer Menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Roti <span className="font-bold">Scnz</span>
        </h2>
        {isLoggedIn ? (
          <div className="flex flex-col items-center mt-4">
            <img
              src={defaultImage} // Replace with your default avatar SVG
              alt="User Avatar"
              className="w-14 h-14 rounded-full"
            />
            <p className=" text-lg text-gray-600 mt-1">{user.displayName}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-4">
            <img
              src={defaultImage} // Replace with your default avatar SVG
              alt="User Avatar"
              className="w-14 h-14 rounded-full"
            />
            <p className="text-lg text-gray-600 mt-1">{generateRandomName()}</p>
          </div>
        )}
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <div className="flex w-full" onClick={() => addItem()}>
                  <MdCreate size={25} className="mr-4" /> Create Item
                </div>
              ) : (
                <>
                  <TbTruckDelivery
                    size={25}
                    className="mr-4"
                    onClick={() => viewOrders()}
                  />{" "}
                  Orders
                </>
              )}
            </li>
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <>
                  <MdSync size={25} className="mr-4" /> Modify Item
                </>
              ) : (
                <>
                  <MdFavorite size={25} className="mr-4" /> Favorites
                </>
              )}
            </li>
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <div className="flex w-full" onClick={() => createCategory()}>
                  <MdLocalPizza size={25} className="mr-4" /> Create New
                  Category
                </div>
              ) : (
                <>
                  <FaWallet size={25} className="mr-4" /> Wallet
                </>
              )}
            </li>
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <>
                  <MdHelp size={25} className="mr-4" /> Assign Category
                </>
              ) : (
                <>
                  <MdHelp size={25} className="mr-4" /> Help
                </>
              )}
            </li>
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <>
                  <MdDelete size={25} className="mr-4" /> Hide Item
                </>
              ) : (
                <>
                  <AiFillTag size={25} className="mr-4" /> Promotions
                </>
              )}
            </li>
            {/* <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <>{""}</>
              ) : (
                <>
                  <BsFillSafeFill size={25} className="mr-4" /> Best Ones
                </>
              )}
            </li> */}
            <li
              className="text-xl py-4 flex hover:cursor-pointer"
              onClick={auth}
            >
              {role === "ADMINISTRATOR" ? (
                <>
                  <MdLogout size={25} className="mr-4" /> Logout
                </>
              ) : (
                <>
                  {isLoggedIn ? (
                    <>
                      <MdLogout size={25} className="mr-4" /> Logout
                    </>
                  ) : (
                    <>
                      <MdLogin size={25} className="mr-4" /> Login
                    </>
                  )}
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
