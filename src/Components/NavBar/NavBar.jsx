import { useContext, useState } from "react";
import { NavLink ,Link } from "react-router-dom"
import { UserContext } from '../../Context/UserContext';
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import logo from "../../assets/freshcart-logo.svg"




function NavBar() {

    const {Logout,userData}=useContext(UserContext)
    const {cart}=useContext(CartContext);
    const {wishlist}=useContext(WishlistContext);
    const [isOpen,setOpen]=useState(false);
    return (
        <nav className="bg-[#f1f5f9] fixed inset-x-0 z-20">
            <div className="flex md:flex-row flex-col md:justify-between md:items-center px-8 lg:px-36 py-5 ">
                <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-between">
                    <Link to='/' className="cursor-pointer mr-4"><img src={logo} alt="" /></Link>
                    <button className="md:hidden" onClick={()=>setOpen(!isOpen)}><i className="fa-solid fa-bars text-2xl text-gray-800"></i></button>
                </div>
                {userData && (
                    <ul  className={`md:flex flex-col md:flex-row md:items-center space-y-4 my-4 md:space-y-0 md:my-0 md:space-x-4 ${isOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
                    <li className="hover:text-gray-500"><NavLink to=''>Home</NavLink></li>
                    <li className="hover:text-gray-500"><NavLink to='/products'>Products</NavLink></li>
                    <li className="hover:text-gray-500"><NavLink to='/categories'>Categories</NavLink></li>
                    <li className="hover:text-gray-500"><NavLink to='/brands'>Brands</NavLink></li>
                    <li className="hover:text-gray-500"><NavLink to='/allorders'>Orders</NavLink></li>
                </ul>
                )}
                </div>
            <div className={`md:flex md:flex-row md:items-center space-x-4 ${isOpen ? 'flex' : 'hidden'}`}>
                {userData && (
                    <div className="flex items-center space-x-3">
                    <Link to='/cart' className="relative">
                    <i className="fa-solid fa-shopping-cart text-emerald-500 text-3xl"></i>
                    <div className="flex justify-center items-center w-5 h-5 text-center absolute bottom-5 left-5 rounded-full bg-emerald-500 text-white">{cart? cart.numOfCartItems : 0}</div>
                    </Link>
                    <Link to='/wishlist' className="relative">
                    <i className="fa-solid fa-heart text-emerald-500 text-3xl"></i>
                    <div className="flex justify-center items-center w-5 h-5 text-center absolute bottom-5 left-5 rounded-full bg-emerald-500 text-white">{wishlist? wishlist.data.length : 0}</div>
                    </Link>
                    </div>
                )}
            
            <div className="text-lg space-x-1  ">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-tiktok"></i>
                <i className="fa-brands fa-instagram"></i>
            </div>
           {userData?(
            <Link to='/login' onClick={Logout}>
            <h3 className="font-semibold cursor-pointer hover:text-gray-600">SignOut</h3>
           </Link>
           ):
           <>
           <Link to='/login'>
                     <h3 className="font-semibold cursor-pointer hover:text-gray-600">Login</h3>
          </Link>
          <Link to='/register'>
                    <h3 className="font-semibold cursor-pointer hover:text-gray-600">Register</h3>
          </Link></>
           }
            </div>
        </div>
        </nav>
    )
}

export default NavBar
