import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/auth/AuthForm.jsx";
import "./App.css";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetProductsQuery} from "./reducers/api";
import ProductsPage from "./pages/ProductsPage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";


function App() {

    const me = useSelector((state) => state.auth.credentials.user);
    const data = useSelector(state=>state.data);
    const products = useGetProductsQuery();

    const [load,setLoad]=useState(true)

    useEffect(()=>{
        setLoad(products.isLoading)
    }, [products])

    const guestRouter = (
        <Routes>
            <Route path="/products" element={<ProductsPage products={products} />} />
            <Route path="/products/:id" element={<SingleProductPage />}/>
        </Routes>
    );
    const userRouter = (
        
        <Routes>
            <Route path="/*" element={<AuthForm />} />
            <Route path="/products" element={<ProductsPage products={products} />} />
        </Routes>
    );

    const loggedIn = me.userId;
    return load? <h1>Loading Data</h1>:loggedIn !== null ? userRouter : guestRouter;
}


export default App;