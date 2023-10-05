import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/Products/ProductCard";
import PriceSlider from "../components/Products/PriceSlider";
import { useGetProductsQuery } from "../reducers/api";


function ProductsPage() {
    const [filterProducts, setFilterProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const [priceRange, setPriceRange] = useState([0, 50]);
    const { data: products = [] } = useGetProductsQuery();
    const [priceRangeText, setPriceRangeText] = useState(`$${priceRange[0]} - $${priceRange[1]}`);


    useEffect(() => {
        setFilterProducts(products)
    }, [products]);

    const handleFilterByCountry = (country) => {
        const filtered = products.filter((product) => product.country_of_origin === country);
        setFilterProducts(filtered);
    };

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
        const filtered = products.filter((product) => product.price >= newValue[0] && product.price <= newValue[1]);
        setFilterProducts(filtered)
        setPriceRangeText(`$${newValue[0]} - $${newValue[1]}`)
    };

    const handleSearch = () => {
        const filtered = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilterProducts(filtered)
    };

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        handleSearch(query)
    };

    console.log('filterProducts:', filterProducts);
    return  (
        <>
           <h1 className="productsTitle">All Products</h1>
           <div className="productBlurb">
            <p>Welcome to the ultimate selection of the very best Canned Air from all around the world. Whether you're choosing Canned Air for yourself or to give as a gift you will find the highest quality selections below. Additionally, we are constantly updating our products so check back regularly for the best deals on Canned Air.</p>
           </div>
           <div className="sidebar">
                <h3>Search for Products</h3>
                <input className="inputBar" type="text" value={searchQuery} onChange={handleInputChange}/>
                <button className="searchButton" onClick={handleSearch}>Search</button>
                
                <h3>Filter By Price</h3>
                <PriceSlider className="priceSlider" range min={0} max={50} value={priceRange} onChange={handlePriceChange} />
                <div className="priceRange">{priceRangeText}</div>
                
                <h3>Filter By Country</h3>
                <button className="countryButton" onClick={()=> handleFilterByCountry("US")}>US</button>
                <button className="countryButton" onClick={()=> handleFilterByCountry("China")}>China</button>
                <button className="countryButton" onClick={()=> handleFilterByCountry("Germany")}>Germany</button>
            </div>
                <div className="listProd">
                    {filterProducts.length === 0 ? (
                        <h1>No Products Listed</h1>
                    ) : (
                        filterProducts.map((product) => (
                        <ProductCard  product={product} />
                        ))
                    )}
                </div>
           

        </>
    );

    
}


export default ProductsPage;