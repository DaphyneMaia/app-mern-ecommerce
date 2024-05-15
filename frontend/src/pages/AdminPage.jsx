import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Grid, Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import RequiredAuth from "../util/authRoutes";
import HomePage from "./HomePage";
import AddProductPage from "./AddProductPage";
import UpdateProductPage from "./UpdateProductPage";
import AuthPage from "./AuthPage";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

import { AuthContext } from "../context/authContext";
import AdminPage from "./AdminPage";

function App() {
  const [userLoggedData, setUserLoggedData] = useState({
    token: null,
    userId: null,
    isAdmin: false,
  });

  const login = (token, userId, isAdmin) => {
    //console.log("app token", token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
    setUserLoggedData({ token: token, userId: userId, isAdmin: isAdmin });
  };

  const logout = () => {
    setUserLoggedData({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        token: userLoggedData.token,
        userId: userLoggedData.userId,
        isAdmin: userLoggedData.isAdmin,
        login: login,
        logout: logout,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* protected views*/}
        <Route
          path="/addProduct"
          element={
            <RequiredAuth>
              <AddProductPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/update/:id"
          element={
            <RequiredAuth>
              <UpdateProductPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <AdminPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequiredAuth>
              <OrdersPage />
            </RequiredAuth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;