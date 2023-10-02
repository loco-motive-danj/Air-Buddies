import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../reducers/api";

export default function FeaturedProducts() {
   const [minCeiling, setMinCeiling] = useState(0);
   const [firstProduct, setFirstProduct] = useState(0);
   const { data: products = [] } = useGetProductsQuery();
   const [displayProducts, setDisplayProducts] = useState([]);

   useEffect(() => {
      setMinCeiling(products.length - 6);
      function randomMin(ceiling) {
         return Math.floor(Math.random() * ceiling);
      }
      setFirstProduct(randomMin(minCeiling));
      setDisplayProducts(products.slice(firstProduct, firstProduct + 6));
   }, []);

   return (
      <>
         {displayProducts.map((e, i) => {
            return (
               <div className="displayCard" key={i}>
                  <img src={e.image_url} className="displayCardImage" />
                  <p className="displayCardName">{e.name}</p>
                  <p className="displayCardPrice">{e.price}</p>
               </div>
            );
         })}
      </>
   );
}
