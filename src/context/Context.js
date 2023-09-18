import React, { useContext, useState } from "react";

//contexts that will be used in the project

export const userContext = React.createContext();
export const updateUserContext = React.createContext();
export const loginContext = React.createContext();
export const updateLoginContex = React.createContext();
export const tokenContext = React.createContext();
export const updateTokenContext = React.createContext();

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

export function ContextProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    displayName: "",
    fullName: "",
    role: "",
    email: "",
  });

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

  return (
    <userContext.Provider value={user}>
      <updateUserContext.Provider value={updateUser}>
        <loginContext.Provider value={isloggedIn}>
          <updateLoginContex.Provider value={updateLoginState}>
            <tokenContext.Provider value={token}>
              <updateTokenContext.Provider value={updateToken}>
                {children}
              </updateTokenContext.Provider>
            </tokenContext.Provider>
          </updateLoginContex.Provider>
        </loginContext.Provider>
      </updateUserContext.Provider>
    </userContext.Provider>
  );
}
