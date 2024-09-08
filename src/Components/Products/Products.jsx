import useProuduct from "../../Hooks/useProuduct";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";


function Products() {

    const {data,isLoading}=useProuduct();
    Scroll();



    if(isLoading)return <Loading />



    return (
        <div>
            <div className="text-center py-3 shadow-md shadow-emerald-500 w-3/4 md:w-1/3 mx-auto rounded-md my-10">
                <h1 className="text-2xl font-bold text-emerald-500 uppercase">Our Products</h1>
            </div>

            <div className="flex flex-wrap justify-center gap-6 p-5">
                {data?.map((product,index)=><RecentProducts key={index} product={product} />)}
            </div>

        </div>
    )
}

export default Products
