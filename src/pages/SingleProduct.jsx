import React from 'react'
import ProductDetails from '../components/Products/ProductDetails'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../reducers/api'
import { useNavigate } from 'react-router-dom'
import QuantityCounter from '../components/Products/QuantityCounter'


function SingleProductPage() {
    const { id } = useParams();
    const {data: productId, isLoading } = useGetProductByIdQuery(id);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
      };
    
  return (
    <div>
      {isLoading ? (<h1>Loading...</h1>) : !productId ? (<h1>Product Not Found</h1>) : (
        <div className="singleProductContainer">
            <ProductDetails product={productId} showDescription={true} />
            <div className="buttonsContainer">
              <button className='cartButton'>Add To Cart</button>
              <button onClick={handleGoBack}>Back to Products</button>
              <QuantityCounter />
            </div>
        </div> 
      )}
        
    </div>
  )
}

export default SingleProductPage
