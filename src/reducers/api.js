import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createSlice} from "@reduxjs/toolkit";

const CREDENTIALS='credentials'
// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers, { getState }) => {
            console.log("prepareHeaders is running");

            const credentials = window.sessionStorage.getItem(CREDENTIALS);
            const parsedCredentials = JSON.parse(credentials || "{}");
            const token = parsedCredentials.token;
            console.log("token from reducer", token);
            if (token) {
                headers.set("Authorization", token);
            }
            console.log("token from session storage:", token);
            return headers;
        },
}),
    endpoints: (builder) => ({
        
        getProducts :builder.query({
            query: (id)=> 'api/products/'
        }),
        getProductById :builder.query({
            query: (id)=> 'api/products/'+id
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url:'api/products/'+id,
                method: "DELETE"
            })
        }),
        addProduct: builder.mutation({
            query: (body)=>({
                url:'api/products'+ id,
                method:"POST",
                body:body
            })
        }),
        editProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/products/'+id,
                    method:"PUT",
                    body
                }
            }
        }),
        getUser :builder.query({
            query: (id)=> 'api/user/'
        }),
        getUserById :builder.query({
            query: (id)=> 'api/user/'+id
        }),
        deleteUser: builder.mutation({
            query: (id)=>({
                url:'api/user/'+id,
                method: "DELETE"
            })
        }),
        addUser: builder.mutation({
            query: (body)=>({
                url:'api/user'+ id,
                method:"POST",
                body:body
            })
        }),
        // editUser : builder.mutation({
        //     query(data){
        //         const {id, ...body}=data;
        //         return {
        //             url: 'api/user/'+id,
        //             method:"PUT",
        //             body
        //         }
        //     }
        // }),
        // addProductToCartProduct: builder.mutation({
        //     query: (body)=>({
        //         url:'/api/' +id + 'productId/CartProduct',
        //         method: "POST",
        //         body: body,
        //     })
        // }),
        getOrdersById: builder.query({
            query: (id)=> 'api/cart/orders/'+id
        }),
        getCartById: builder.query({
            query: (id)=> 'api/cart/'+ id
        }),
        // editCart : builder.mutation({
        //     query(data){
        //         const {id, ...body}=data;
        //         return {
        //             url: 'api/cart/'+id,
        //             method:"PUT",
        //             body
        //         }
        //     }
        // }),
        addCart : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart/',
                    method:"POST",
                    body
                }
            }
        }),
        deleteCart : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart/'+id,
                    method:"DELETE",
                    body
                }
            }
        }),
          editSubmitCart : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart/submit',
                    method:"PUT",
                    body
                }
            }
        }),
        editCartProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart_product/',
                    method:"POST",
                    body
                    
                }
            }
        }),
    



    }),
})

const dataSlice = createSlice({
    name:"data",
    initialState:{
        products:[], 
        orders: [],
        cart: [],
        // itemsCount: 0,
    },
    reducers:{},
    extraReducers: (builder)=>{
       
        builder.addMatcher(storeApi.endpoints.getProducts.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                products: payload
            }
        })

        builder.addMatcher(storeApi.endpoints.deleteProduct.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                products: state.products.filter(i=>i.id!==payload.id)
            }

        })

        builder.addMatcher(storeApi.endpoints.addProduct.matchFulfilled, (state, {payload})=>{
            state.products.push(payload);
            return state;
        })

        builder.addMatcher(storeApi.endpoints.getOrdersById.matchFulfilled, (state, { payload }) => {
            return {
                ...state,
                orders: payload
                
            }
        })

        // builder.addMatcher(storeApi.endpoints.addProductToCartProduct.matchFulfilled, (state, {payload}) => {
        //     console.log(payload)
        //     return {
        //         ...state, 
        //         products: payload
        //     }
        // })

        builder.addMatcher(storeApi.endpoints.getCartById.matchFulfilled, (state, {payload}) => {
            console.log(payload)
            return {
                ...state, 
                cart: payload
            }
        })

        // builder.addMatcher(storeApi.endpoints.editCartProduct.matchFulfilled, (state, {payload}) => {
        //     console.log(payload)
        //     state.itemsCount = action.payload.addedToCart.length;
        // })
    

}})

export default dataSlice.reducer;

export const {useGetUserQuery, useAddUserMutation, useDeleteUserMutation, useEditProductMutation, useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditCartMutation, useAddCartMutation, useDeleteCartMutation, useGetCartByIdQuery, useGetOrdersByIdQuery, useAddProductToCartProductMutation, useEditSubmitCartMutation, useEditCartProductMutation} = storeApi

