import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
// import SingleProduct from "./pages/SingleProduct";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetProductsQuery} from "./reducers/api";

function App() {
   const products = useGetProductsQuery();

   const [load, setLoad] = useState(true);

    useEffect(()=>{
        setLoad(products.isLoading)
    }, [products])

    const guestRouter = (
        <Routes>
            <Route path="/*" element={<AuthForm/>}/>
        </Routes>
    );
    const userRouter = (
        
        <Routes>
            <Route index element={<Products/>}/>
        </Routes>
    );

    const loggedIn = me.userId;
    return load? <h1>Loading Data</h1>:loggedIn !== null ? userRouter : guestRouter;
}

export default App;
