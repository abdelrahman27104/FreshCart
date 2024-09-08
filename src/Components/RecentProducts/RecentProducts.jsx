import { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { UserContext } from "../../Context/UserContext";

function RecentProducts({ product }) {
   const { addToCart,loadingProduct} = useContext(CartContext);
   const { wishlist, addToWishlist, deleteWish} = useContext(WishlistContext);
   const {userData}=useContext(UserContext)
   const [isliked, setLiked] = useState(false);

   useEffect(()=>{
    if(wishlist && wishlist.data){
      const status = wishlist?.data?.some((item) => item.id === product?.id);
      setLiked(status)
    }
   },[wishlist,product])



   function handletoggle() {
        const newliked=!isliked;
        if(newliked) {
            addToWishlist(product.id);

        } else {
            deleteWish(product.id);

        }
        setLiked(newliked)


      }


      

   

   




  return (
    <div className="w-full sm:w-1/3 md:w-1/6 border-2 border-emerald-300 p-4 pb-16 relative hover:shadow-emerald-500 hover:shadow-lg duration-500 cursor-pointer overflow-hidden group">
      <Link to={`/productDetails/${product.id}/${product.category.name}`}>
        <img src={product.imageCover} alt="" className="w-full mb-2" />
        <h4 className="text-emerald-400">{product.category.name}</h4>
        <h3 className="font-semibold text-black">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h3>
        <div className="flex justify-between items-center">
          <h3>{product.price} EGP</h3>
          <h3>
            <i className="fa-solid fa-star text-yellow-400"></i>{" "}
            <span>{product.ratingsAverage}</span>
          </h3>
        </div>
      </Link>
      <button
        className="bg-emerald-300 rounded-full h-9 w-9 flex justify-center items-center absolute right-5 duration-500 top-5"
        onClick={() => handletoggle()}
      >
        <i className={`${isliked && userData ? "fa-solid" : "fa-regular"} fa-heart`}></i>
      </button>
      <button
        className="absolute -translate-x-1/2 left-1/2 -bottom-14 bg-emerald-500 hover:bg-emerald-300 py-2 w-3/4 rounded-md text-white group-hover:bottom-2 duration-500"
        onClick={() => addToCart(product.id)}
      >
        {loadingProduct===product.id ? (
          <>
            <i className="fa fa-spinner fa-spin text-sm"></i>
            <span className="text-lg ml-1">Loading...</span>
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}

export default RecentProducts;
