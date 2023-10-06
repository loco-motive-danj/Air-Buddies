import React from 'react'
import QuantityCounter from '../components/Products/QuantityCounter'
import "./Cart.css"
import { Link } from 'react-router-dom'
import { useGetProductByIdQuery } from '../reducers/api'

function Cart() {
  
    const { data, isLoading } = useGetProductByIdQuery();

    const { refetch } = useGetProductByIdQuery();

    useGetProductByIdQuery()
    
  
    return (
        <>
            <div className='cartContainer'>
                <h1>Your Cart</h1>
                <h3>Items in Your Cart</h3>




                <div className="cartButtons">
                    <button>Remove From Cart</button>
                    <QuantityCounter />
                    <button>Edit Cart Selections</button>
                </div>


            </div>
            <div className="toCheckout">
                <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                </Link>
            </div>
        </>
  )
}

export default Cart
