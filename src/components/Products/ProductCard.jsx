import React from "react";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function ProductCard({ product, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/products/${product.id}`);
    };

    return (
      <>
        {product ? (
          <div className="productContainer" onClick={handleClick}>
            <ProductDetails product={product} showDescription={false} />
          </div>
        ) : (<h1>No Product Listed</h1>)}
      </>
  );
  
}

export default ProductCard;
