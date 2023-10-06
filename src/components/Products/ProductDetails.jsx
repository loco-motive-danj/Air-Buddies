import React from "react";

function ProductDetails({ product, showDescription }) {
  return (
    <div className="productDetails" key={product.id}>
      <img src={product.image_url} alt="product images" />
      <div className="productInfo">
        <h1>{product.name}</h1>
        <h3>$ {product.price}</h3>
        <h3>Country: {product.country_of_origin}</h3>
        {showDescription && <p>Description: {product.description}</p>}
      </div>
    </div>
  );
}

export default ProductDetails;
