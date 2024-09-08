
import { NavLink } from "react-router-dom";
import useGategory from "../../Hooks/useGategory";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";


function Categories() {

      const {data=[] ,isLoading}=useGategory();
      Scroll();


   


     
     if(isLoading)return <Loading />
     


    return (
            <div className="py-2">
                <div className="text-center py-3 shadow-md shadow-emerald-500 w-3/4 md:w-1/3 mx-auto rounded-md my-10">
                <h1 className="text-2xl font-bold text-emerald-500 uppercase">Shop Popular Categories</h1>
                </div>
                <div className="flex flex-wrap px-5 gap-10 justify-center">
                {data.map((category)=>
                <div key={category._id} className="text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-lg shadow-emerald-500 rounded-3xl p-7">
                    <NavLink to={`/categoryProducts/${category.name}`}>
                    <div className=" flex justify-center items-center text-center w-full bg-emerald-300 rounded-full">
                    <img src={category.image} alt="" className="h-[350px] w-4/5 rounded-3xl"   />
                    </div>
                    <h3 className="text-emerald-800 font-bold ">{category.name}</h3>
                    </NavLink>
                    
                </div>
                )}
                </div>
                
            </div>
    )
    

}


export default Categories
