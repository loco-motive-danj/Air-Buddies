import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import Account from "./pages/Account.jsx";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "./reducers/api";
import Home from "./pages/Home.jsx";

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
            <Route path="/account" element={<Account />} />
         </Routes>
      </>
   );

   return load ? <h1>Loading</h1> : loadedRouter;
}

export default App;
