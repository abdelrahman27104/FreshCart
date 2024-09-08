import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import add from "../../assets/shopping-cart-add.png"
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";

function Wishlist() {

    const {wishlist,deleteWish,loading}=useContext(WishlistContext);
    const {addToCart,isLoading}=useContext(CartContext);
    Scroll();

    
    if(loading)return <Loading />
    




    return (
        <div className="p-5">
            {
                wishlist && wishlist.data.length>0?
                <div className="w-full">
                    {
                        wishlist.data.map((item,index)=>
                            <div key={index} className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-evenly items-center my-5 rounded-md py-8 shadow-md shadow-emerald-500 ">
                                <button onClick={()=>deleteWish(item._id)}><i className="fa fa-trash text-red-800"></i></button>
                                <div className="w-32"><img src={item.imageCover} alt="" className="w-full" /></div>
                                <h3>{item?.title?.split(' ').slice(0,2).join(' ')}</h3>
                                <h3 className="font-semibold">{item.price} EGP</h3>
                                <button className="bg-emerald-500 hover:bg-emerald-300 py-2 px-5 rounded-md text-white" onClick={()=>addToCart(item._id)} >{isLoading?<><i className='fa fa-spinner fa-spin text-sm'></i><span className="text-lg ml-1">Loading...</span></>:"Add to Cart"}</button> 
                            </div>
                        )
                    }

                </div>
                :
                <div className="flex flex-col items-center ">
                <div className="w-80"><img src={add} alt="" /></div>
                <h1 className="text-[#4cba68] text-4xl md:text-5xl font-semibold">Your Wishlist Is Empty</h1>
                <Link to=''><button className="bg-[#4cba68] hover:bg-[#3e9754c7] text-white font-semibold px-10 py-5  rounded-lg my-5">Shop Now</button></Link>
        
        </div>
            }
            
        </div>
    )
}

export default Wishlist
