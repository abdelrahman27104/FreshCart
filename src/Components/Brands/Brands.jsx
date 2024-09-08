
import { NavLink } from "react-router-dom";
import useBrands from "../../Hooks/useBrands";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";


function Brands() {

      const {data,isLoading,error}=useBrands();
      Scroll();


     
     if(isLoading)return <Loading />
     if(error)console.log("error fetch brands",error);
     


    return (
            <div className="px-10 py-2">
                <div className="text-center py-3 shadow-md shadow-emerald-500 w-3/4 md:w-1/3 mx-auto rounded-md my-10">
                <h1 className="text-2xl font-bold text-emerald-500 uppercase">Shop Popular Brands</h1>
                </div>
                <div className="flex flex-wrap justify-center px-5 gap-10 ">
                {data.map((brand)=>
                <div key={brand._id} className="flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-lg shadow-emerald-500 rounded-3xl hover:scale-90 duration-300">
                    <NavLink to={`/brandsProducts/${brand.name}`}>
                    <img src={brand.image} alt="" className="h-[350px] w-full rounded-3xl"   />
                    </NavLink>
                    
                </div>
                )}
                </div>
                
            </div>
    )
    

}


export default Brands
