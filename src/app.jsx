import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleProduct from "./pages/SingleProduct";
import Products from "./pages/Products";
import Account from "./pages/Account.jsx";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "./reducers/api";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import ThankYou from "./pages/ThankYou";


function App() {
   const products = useGetProductsQuery();

   const [load, setLoad] = useState(true);

   useEffect(() => {
      setLoad(products.isLoading);
   }, [products]);

   const loadedRouter = (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/thankyou" element={<ThankYou />} />
         </Routes>
      </>
   );


    const loggedIn = me.userId;
    return load? <h1>Loading Data</h1>:loggedIn !== null ? userRouter : guestRouter;
}

export default App;
