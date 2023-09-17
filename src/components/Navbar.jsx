import React, { useState } from "react";
import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartFill, BsFillSafeFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import {
  MdHelp,
  MdFavorite,
  MdCreate,
  MdSync,
  MdLocalPizza,
  MdDelete,
} from "react-icons/md";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const user = useUser();
  const role = user.role;

  const addItem = () => {
    navigate("/add-item");
  };

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
      <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full">
        <BsFillCartFill size={20} className="mr-2" />
        Cart
      </button>

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
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <div className="flex w-full" onClick={() => addItem()}>
                  <MdCreate size={25} className="mr-4" /> Create Item
                </div>
              ) : (
                <>
                  <TbTruckDelivery size={25} className="mr-4" /> Orders
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
                <>
                  <MdLocalPizza size={25} className="mr-4" /> Create New
                  Category
                </>
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
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <>{""}</>
              ) : (
                <>
                  <BsFillSafeFill size={25} className="mr-4" /> Best Ones
                </>
              )}
            </li>
            <li className="text-xl py-4 flex hover:cursor-pointer">
              {role === "ADMINISTRATOR" ? (
                <></>
              ) : (
                <>
                  <FaUserFriends size={25} className="mr-4" /> Invite Friends
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