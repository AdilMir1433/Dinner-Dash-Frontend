import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { ContextProvider } from "./context/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./pages/AddItem";
import CreateCategory from "./pages/CreateCategory";
import ItemDetail from "./pages/ItemDetail";
import OrderPage from "./pages/OrderPage";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" Component={() => <Home />} />
            <Route path="/auth" Component={() => <Login />} />
            <Route path="/add-item" Component={() => <AddItem />} />
            <Route path="/add-category" Component={() => <CreateCategory />} />
            <Route path="/view-item/:id" Component={() => <ItemDetail />} />
            <Route path="/order" Component={() => <OrderPage />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
