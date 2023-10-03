import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../reducers/api";

export default function FeaturedProducts() {
   const { data: products = [] } = useGetProductsQuery();
   const [displayProducts, setDisplayProducts] = useState([]);
   let ceiling = products.length - 6;
   const [floor, setFloor] = useState(0);
   console.log(floor);
   useEffect(() => {
      function randomMin(max) {
         return Math.floor(Math.random() * max);
      }
      setFloor(randomMin(ceiling));
      setDisplayProducts(products.slice(floor, floor + 6));
   }, []);

   const featuredDisplay = (
      <>
         {displayProducts.map((e, i) => {
            return (
               <div className="display-card" key={i}>
                  <img src={e.image_url} className="display-card-image" />
                  <p className="display-card-name">{e.name}</p>
                  <p className="display-card-price">{e.price}</p>
               </div>
            );
         })}
      </>
   );

   return displayProducts.length === 0 ? (
      <p>honk</p>
   ) : (
      <div className="display-container">{featuredDisplay}</div>
   );
}
