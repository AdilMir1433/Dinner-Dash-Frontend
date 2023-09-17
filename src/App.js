import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { ContextProvider } from "./context/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./pages/AddItem";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" Component={() => <Home />} />
            <Route path="/auth" Component={() => <Login />} />
            <Route path="/add-item" Component={() => <AddItem />} />
            {/* <Route path="/blog/:id" Component={Blog} />

          <Route path="/create-blog" Component={MyEditor} /> */}
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
