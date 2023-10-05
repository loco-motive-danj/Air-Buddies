
// import { Link, useParams } from 'react-router-dom';
import { useEditCartProductMutation } from "../reducers/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


function Cart() {
    const [addToCart, { isLoading, isError, data }] = useEditCartProductMutation();
    // const me = useSelector(state => state.auth.credentials.user)
    const [itemsCount, setItemsCount] = useState(0);
    
    useEffect(() => {
        if (data && data.addedToCart) {
            setItemsCount(data.addedToCart.length);
        }
    }, [data]);

    const handleAddToCart = async () => {
        await addToCart({productId: 4, quantity: 1});
      };

    return (
        <div>
          <button onClick={() => handleAddToCart()}>
            Add to Cart
          </button>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error adding to cart.</p>}
          <p>Items in cart: {itemsCount}</p>
        </div>
      );
}

export default Cart;
