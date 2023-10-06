import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../reducers/api";
import "./FeaturedProducts.css";
import { useNavigate } from "react-router-dom";
import SingleProductPage from "../pages/SingleProduct";


export default function FeaturedProducts() {
   const { data: products = [] } = useGetProductsQuery();
   const [displayProducts, setDisplayProducts] = useState([]);
   let ceiling = products.length - 6;
   const [floor, setFloor] = useState(0);
   useEffect(() => {
      function randomMin(max) {
         return Math.floor(Math.random() * max);
      }
      setFloor(randomMin(ceiling));
      setDisplayProducts(products.slice(floor, floor + 6));
   }, []);

   const navigate = useNavigate();
    
   const handleClick = (productId) => {
     navigate(`/products/${productId}`);
   };

   const featuredDisplay = (
      <>
         {displayProducts.map((e, i) => {
            return (
              <div className="display-card" key={i} onClick={() => handleClick(e.id)}>
                  <img src={e.image_url} className="display-card-image" />
                  <h2 className="display-card-name">{e.name}</h2>
                  <p className="display-card-price">{e.price}</p>
               </div>
            );
         })}
      </>
   );

   return displayProducts.length === 0 ? (
      <p>Something went wrong!</p>
   ) : (
      <div className="display-container">{featuredDisplay}</div>
   );
}
