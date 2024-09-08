import { useContext} from "react"
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";
import add from "../../assets/shopping-cart-add.png"

function Cart() {

    const {cart,deleteCart,updateCount,isLoading}=useContext(CartContext) ; 
    Scroll();
    console.log(cart)


    if(isLoading)return <Loading />

    const products=cart?.data?.products|| [];
    const total=cart?.data?.totalCartPrice || 0;

    

    return (
        <div className="p-5">            
            {products.length>0?
            <>
            <h1 className="text-center text-5xl font-semibold ">My Cart <i className="fa-solid fa-shopping-cart text-emerald-500"></i></h1>
            <div className="md:flex md:items-start md:space-x-3">
            <div className="w-full md:w-3/4">
            {products.map((item,index)=>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-evenly my-5 rounded-md py-8 shadow-md shadow-emerald-500" key={index}>
                    <div className="w-32"><img src={item.product.imageCover} alt="" className="w-full" />
                    </div>
                    <h3 className="font-semibold">{item.product.category.name}</h3>
                    <div>
                    <i className="fa fa-minus text-white bg-emerald-500 rounded-full p-1 cursor-pointer" onClick={()=>updateCount(item.product.id,item.count-1)}></i>
                    <span className="text-gray-500 mx-2">{item.count}</span>
                    <i className="fa fa-plus  text-white bg-emerald-500 rounded-full p-1 cursor-pointer" onClick={()=>updateCount(item.product.id,item.count+1)}></i>
                    </div>
                    <h3 className="font-semibold">{item.price} EGP</h3>
                    <button className="text-red-800 border-2 border-red-800 hover:bg-red-800 hover:text-white rounded-md py-2 px-3" onClick={()=>deleteCart(item.product.id)}>Remove<i className="fa fa-trash ml-1"></i></button>
                </div>)}
                </div>
                <div className="w-full md:w-1/5 shadow-md mt-5 shadow-emerald-500 text-emerald-50 p-3">
                <h3 className="border-emerald-300 border-b-2 p-2 font-bold text-emerald-500">Cart Summary</h3>
                <h3 className="border-emerald-300 border-b-2 p-2 font-bold text-emerald-500">Total Cart Price = {total} EGP</h3>
                <div className="flex justify-center my-2">
                    <Link to='/checkout'><button className="text-white bg-emerald-500 hover:bg-emerald-300 p-3 rounded-md" >CheckOut Now</button></Link>
                </div>
                </div>
                </div>
                </>
            :
            <div className="flex flex-col items-center ">
                <div className="w-80"><img src={add} alt="" /></div>
                <h1 className="text-[#4cba68] text-4xl md:text-5xl font-semibold">Your Cart Is Empty</h1>
                <Link to='/'><button className="bg-[#4cba68] hover:bg-[#3e9754c7] text-white font-semibold px-10 py-3  rounded-lg my-5">Shop Now</button></Link>
        
        </div>
            }
            
        </div>
    )
}

export default Cart
