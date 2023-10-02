import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm.jsx";
import "./App.css";
import Products from "./pages/Products";
import Account from "./pages/Account.jsx";
// import SingleProduct from "./pages/SingleProduct";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "./reducers/api";
import Home from "./pages/Home.jsx";

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/account" element={<Account />} />
         </Routes>
      </>
   );
}

export default App;
