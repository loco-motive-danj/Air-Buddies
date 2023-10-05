import { useAddCartMutation, useAddProductToCartProductMutation, useGetProductByIdQuery, useGetCartByIdQuery } from "../reducers/api";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function Cart() {
    const {data: product, isLoading: ProductLoading} = useGetProductByIdQuery(5);
    const me = useSelector(state => state.auth.credentials.user)
    const {data: CartData, isLoading: CartLoading } = useGetCartByIdQuery(me.userId);
    const [addToCartProduct]  = useAddProductToCartProductMutation();
    const [cartCount, setCartCount] = useState(0);

    // const ItemsInCart = CartData.CartProducts

    // useEffect(()=> {
    //     if( CartLoading || ProductLoading){
    //         console.log('haha')
    //     }
    //     const ItemsInCart = CartData
    //     if(ItemsInCart>0) {
    //         console.log(ItemsInCart.Cart.CartProducts);
    //         setCartCount(ItemsInCart.Cart.CartProducts.map(i => {
    //           i.length  
    //         }));
    //     }
    // }, [product, CartData ]);
   

    // const submit = async () => {
    //     try {
    //         await addToCartProduct({
    //             productId: product.id,
    //             cartId: CartData.cartId,
    //             quantity: 1,
    //         });
    //         console.log("added");
    //         setCartCount(prevCount => prevCount + 1);
    //     } catch (error) {
    //         console.log("error");
    //     }
    // };

    if (ProductLoading || CartLoading ) {
        return <h1>Loading...</h1>;
    }
    const loggedIn = me.userId
    return (
        <>
            {loggedIn!== null && CartData ? (
                <>
                    <div className="product">
                        <h2>{product.name}</h2>
                    </div>
                    <button onClick={submit}>Add to Cart</button> 
                    <div> Items in cart: {cartCount} </div>
                </>
            ) : (
                <Link to={"/*"}>Auth</Link>
            )}
        </>
    );
}

export default Cart;
