import React, { useContext, useState } from "react";

//contexts that will be used in the project

export const userContext = React.createContext();
export const updateUserContext = React.createContext();
export const loginContext = React.createContext();
export const updateLoginContex = React.createContext();
export const tokenContext = React.createContext();
export const updateTokenContext = React.createContext();
export const cartContext = React.createContext();
export const updateCartContext = React.createContext();
export const userCartContext = React.createContext();
export const updateUserCartContext = React.createContext();
//custom hooks to use the contexts

export function useUser() {
  return useContext(userContext); // this returns user object
}

export function useUserUpdate() {
  return useContext(updateUserContext); // this returns setUser function
}

export function useLogin() {
  return useContext(loginContext);
}

export function useLoginUpdate() {
  return useContext(updateLoginContex);
}

export function useToken() {
  return useContext(tokenContext);
}

export function useTokenUpdate() {
  return useContext(updateTokenContext);
}

export function useCart() {
  return useContext(cartContext);
}

export function useCartUpdate() {
  return useContext(updateCartContext);
}

export function useUserCart() {
  return useContext(userCartContext);
}

export function useUserCartUpdate() {
  return useContext(updateUserCartContext);
}

export function ContextProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    displayName: "",
    fullName: "",
    role: "",
    email: "",
  });

  const [cart, setCart] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const [isloggedIn, setisLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const updateUser = (data) => {
    setUser(data);
  };

  function updateLoginState() {
    setisLoggedIn((prev) => !prev);
  }

  function updateToken(newToken) {
    setToken(newToken);
  }

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const updateUserCart = (newCart) => {
    setUserCart(newCart);
  };

  return (
    <userContext.Provider value={user}>
      <updateUserContext.Provider value={updateUser}>
        <loginContext.Provider value={isloggedIn}>
          <updateLoginContex.Provider value={updateLoginState}>
            <tokenContext.Provider value={token}>
              <updateTokenContext.Provider value={updateToken}>
                <cartContext.Provider value={cart}>
                  <updateCartContext.Provider value={updateCart}>
                    <userCartContext.Provider value={userCart}>
                      <updateUserCartContext.Provider value={updateUserCart}>
                        {children}
                      </updateUserCartContext.Provider>
                    </userCartContext.Provider>
                  </updateCartContext.Provider>
                </cartContext.Provider>
              </updateTokenContext.Provider>
            </tokenContext.Provider>
          </updateLoginContex.Provider>
        </loginContext.Provider>
      </updateUserContext.Provider>
    </userContext.Provider>
  );
}
