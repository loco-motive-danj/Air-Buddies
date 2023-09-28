import { useDeleteProductMutation, useAddProductMutation} from "../reducers/api";

import {useSelector} from "react-redux";

function Products() {
    const products = useSelector(state=>state.data.products);
    return  (
        <>
    
            {products.length===0? <h1>No Products Listed</h1>:products.map((i)=>
                <div key={i.id}>
                    <h1 >{i.name}</h1>
                    <h3>$ {i.price}</h3>
                </div>

            )}

        </>
    );

    
}


export default Products;