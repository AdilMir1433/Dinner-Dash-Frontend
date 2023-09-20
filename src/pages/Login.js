import React, { useState } from "react";
import "..//css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useUser,
  useUserUpdate,
  useLoginUpdate,
  useTokenUpdate,
  useCartUpdate,
  useCart,
  useUserCartUpdate,
} from "../context/Context";
import API_BASE_URL from "../apiConfig/APIConfig";

export default function Login() {
  const navigate = useNavigate();
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const cart = useCart();
  const setCart = useCartUpdate();
  const updateUserCart = useUserCartUpdate();
  const user = useUser(); //custom hook to get user
  const setUser = useUserUpdate(); //custom hook to get setUser
  const setLogin = useLoginUpdate(); //custom hook to change state of login
  const setToken = useTokenUpdate(); // custom hook to save token
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json", // Set the content type if needed
  //   },
  // };

  const [userSignUpDTO, setUserSignUpDTO] = useState({
    displayName: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [loginUser, setLoginUser] = useState({
    password: "",
    email: "",
  });

  const onInputChange = (e) => {
    setUserSignUpDTO({ ...userSignUpDTO, [e.target.name]: e.target.value });
  };
  const onInputChangeLogin = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `${API_BASE_URL}/user/signup`;
    const res = await axios.post(endpoint, userSignUpDTO);
    console.log("Data: ", res.data.data);
    if (res.data.responseCode === 0) {
      setUser(res.data.data, () => {
        console.log("User : ", user);
      });
      setToken(res.data.refreshToken);
      setLogin();
      createCart(res.data.data.id);
      if (cart != null) {
        setCart(cart);
      }
      createCart(res.data.data.id);
      navigate("/home");
    } else {
      createToast("Invalid Credentials");
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `${API_BASE_URL}/user/login`;
      const res = await axios.post(endpoint, loginUser);
      if (res.data.responseCode === 0) {
        console.log("DATA : ", res.data.data);
        setUser(res.data.data);
        setToken(res.data.refreshToken);
        setLogin();
        createCart(res.data.data.id);
        console.log("CART : ", cart);
        if (cart != null) {
          setCart(cart);
        }
        navigate("/home");
      } else {
        createToast("Invalid Credentials");
      }
    } catch (error) {
      createToast("An error occurred while logging in.");
    }
  };

  const createCart = async (id) => {
    try {
      const endpoint = `${API_BASE_URL}/cart/create-cart/${id}`;
      const res = await axios.post(endpoint);
      if (res.data.responseCode === 0) {
        console.log("Cart : ", res.data.data);
        updateUserCart(res.data.data);
      } else {
        console.log("An Internal Error Occured");
      }
    } catch (error) {
      console.log("Error Creating Cart.", error);
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

  function validateLogin(e) {
    var canSubmit = true;

    var username = document.getElementById("name");
    if (username.value.trim() === "") {
      username.classList.add("error");

      setTimeout(function () {
        username.classList.remove("error");
      }, 300);

      e.preventDefault();
      createToast("Name Not Entered");
      canSubmit = false;
    } else {
      username.style.backgroundColor = null;
      canSubmit = true;
    }
    var password = document.getElementById("password");
    if (password.value.trim() === "") {
      password.classList.add("error");

      setTimeout(function () {
        password.classList.remove("error");
      }, 300);

      e.preventDefault();
      createToast("Password Not Entered");
      canSubmit = false;
    } else {
      password.style.backgroundColor = null;
      canSubmit = true;
    }
    var email = document.getElementById("email");
    if (email.value.trim() === "") {
      createToast("Email Not Entered");
      email.classList.add("error");

      setTimeout(function () {
        email.classList.remove("error");
      }, 300);

      e.preventDefault();
      canSubmit = false;
    } else {
      email.style.backgroundColor = null;
      canSubmit = true;
    }
    if (canSubmit) {
      onSubmit(e);
    }
  }

  function validate(e) {
    var canSubmit = true;
    var password = document.getElementById("pass");
    if (password.value.trim() === "") {
      password.classList.add("error");

      setTimeout(function () {
        password.classList.remove("error");
      }, 300);

      e.preventDefault();
      createToast("Password Not Entered");
      canSubmit = false;
    } else {
      password.style.backgroundColor = null;
      canSubmit = true;
    }
    var email = document.getElementById("mail");
    if (email.value.trim() === "") {
      createToast("Email Not Entered");
      email.classList.add("error");

      setTimeout(function () {
        email.classList.remove("error");
      }, 300);

      e.preventDefault();
      canSubmit = false;
    } else {
      email.style.backgroundColor = null;
      canSubmit = true;
    }
    if (canSubmit) {
      onSubmitLogin(e);
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
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
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span
                className="link-primary register-acc"
                onClick={changeAuthMode}
              >
                Sign Up
              </span>
            </div>

            <div className="form-group mt-3">
              <label>Email Address</label>
              <input
                id="mail"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                required
                name="email"
                value={loginUser.email}
                onChange={(e) => onInputChangeLogin(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="pass"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required
                name="password"
                value={loginUser.password}
                onChange={(e) => onInputChangeLogin(e)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                id="submit-btn"
                className="btn btn-primary"
                onClick={(e) => validate(e)}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              {/* Forgot <a href="#">password?</a> */}
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
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
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary register-acc"
              onClick={changeAuthMode}
            >
              Sign Up
            </span>
          </div>

          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              id="name"
              type="text"
              className="form-control mt-1"
              placeholder="Enter Name"
              required
              name="fullName"
              value={userSignUpDTO.fullName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
              name="email"
              value={userSignUpDTO.email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
              name="password"
              value={userSignUpDTO.password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Display Name</label>
            <input
              id="displayName"
              type="text"
              className="form-control mt-1"
              placeholder="Display Name"
              minLength={2}
              maxLength={32}
              name="displayName"
              value={userSignUpDTO.displayName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => validateLogin(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
