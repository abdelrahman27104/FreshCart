import axios from "axios";
import {createContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";


export  const CartContext=createContext();

export default function CartContextProvider({children}){

    const [cart,setCart]=useState(null);
    const [cartOwner,setCartOwner]=useState(null)
    const [isLoading,setLoading]=useState(false);
    const [loadingProduct,setLoadingPro]=useState(null)
    const {userData}=useContext(UserContext);
    const headers=userData?{token:userData}:"";


    async function addToCart(productId) {
        if(!headers){
            toast.error("You need to be logged in to add products to the cart.");
            return;
        }
        setLoading(true);
        setLoadingPro(productId)
        try{
            const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{headers});
            setCart(data);
            toast.success('Added to cart successfully');
        }
        catch(error){
            console.error("Error adding product to cart:", error);
            toast.error("Failed to add product to cart.");
        }
        finally{
            setLoading(false);
            setLoadingPro(null)
        }

        
        
    }

    async function getCart() {
        if(!headers)return;
        setLoading(true)
        try{
            const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers});
            setCart(data);
            setCartOwner(data.data.cartOwner);

        }
        catch(error){
            console.error("Error adding product to cart:", error);
            toast.error("Failed to retrieve cart items.");
        }
        finally{
            setLoading(false);
        }
        
    }

    async function deleteCart(productId) {
        try{
            const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers});
            setCart(data);
            toast.success('Deleted from cart successfully');

        }
        catch(error){
            console.error("Error deleting product from cart:", error);
            toast.error("Failed to delete product from cart.");
        }
        
    }

    async function updateCount(productId,count) {
        if(count>0){
            try{
                const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers});
                setCart(data);
                toast.success("Item to updated successfully.");
            }
            catch(error){
                console.error("Error adding product to cart:", error);
            }
        }
        else{
            deleteCart(productId)
        }
    }


    

    

    async function checkOut(shippingAddress) {
        setLoading(true)

        try{
            let redirectUrl = encodeURIComponent('https://abdelrahman27104.github.io/freshcart/#');
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=${redirectUrl}`,
                {shippingAddress},
                {headers}
            )
            window.location.href = data.session.url
            setLoading(false)
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
    }
}

    useEffect(()=>{
        if(userData)getCart();
        else setCart(null)
    },[userData])





    return <CartContext.Provider value={{addToCart,setCart,cart,getCart,isLoading,deleteCart,updateCount,loadingProduct,checkOut,cartOwner}}>
                {children}
            </CartContext.Provider>
}