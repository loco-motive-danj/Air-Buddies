
import { useGetOrdersByIdQuery} from "../reducers/api";

import {useSelector} from "react-redux";


function InactiveUserOrder() {
    const products = useSelector(state => state.data.products);
    const me = useSelector(state => state.auth.credentials.user);
    const { data, isLoading } = useGetOrdersByIdQuery(me.userId);
    


    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : data.length === 0 ? (
                <h1> You have no orders </h1>
            ) : (
                data.map(order => (
                    <div key={order.id}>
                        <h1> {me.username}'s Orders </h1>
                        {order.CartProduct && order.CartProduct.length > 0 ? (
                            order.CartProduct.map(cartProduct => {
                                const matched = products.find(prod => prod.id === cartProduct.productId);
                                return (
                                    <div key={cartProduct.id}>
                                        <h2>CartProduct ID: {cartProduct.id}</h2>
                                        {matched && (
                                            <div>
                                                <h3>Product Name: {matched.name}</h3>
                                            </div>
                                        )}
                                        <h3>Quantity: {cartProduct.quantity}</h3>
                                    </div>
                                );
                            })
                        ) : (
                            <h2>No CartProducts for this order</h2>
                        )}
                    </div>
                ))
            )}
        </>
    );
}

export default InactiveUserOrder;

