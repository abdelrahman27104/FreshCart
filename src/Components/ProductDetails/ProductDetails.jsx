import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import Scroll from "../Scroll/Scroll";

function ProductDetails() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [recommend,setRecommend]=useState([])
    const { id ,categoryname } = useParams();
    const {addToCart,loadingProduct}=useContext(CartContext);

    Scroll()





    async function getDetails() {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setProduct(data.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        finally{
            setLoading(false);


        }
    }

    async function getreco() {
        setLoading(true);

        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            let realted=data.data.filter((item)=>item.category.name===categoryname);
            setRecommend(realted);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getDetails();
        getreco()
    }, [id,categoryname]);



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    if (loading) return <Loading />;
    if(error)console.log(error)




    return (
        <>
        <div className="flex items-center  md:space-x-10 p-5 flex-wrap space-y-4 sm:space-y-0">
            <div className="w-full sm:w-3/12  rounded-md shadow-emerald-400 pb-10 shadow-md">
            {product && product?.images?.length > 1 ? (
                <Slider {...settings}>
                    {product.images.map((src, index) => (
                        <img src={src} alt="" key={index}  />
                    ))}
                </Slider>
            ) : (
                <img src={product?.imageCover} alt="" />
            )}
            </div>
            <div className="space-y-3 w-full sm:w-8/12">
            <h3 className="text-2xl font-semibold">{product?.description}</h3>
            <h4 className="text-emerald-400">{product?.category?.name}</h4>
            <h4 className="font-semibold text-gray-700">{product?.title.split(' ').slice(0,2).join(' ')}</h4>
            <div className="flex justify-between items-center">
                <h3>{product?.price} EGP</h3>
                <h3><i className="fa-solid fa-star text-yellow-400"></i> <span>{product?.ratingsAverage}</span></h3>
            </div>
            <div className="bg-emerald-300 rounded-full h-9 w-9 flex justify-center items-center absolute right-5 duration-500 top-5 ">
                <i className="fa-regular fa-heart  "></i>
            </div>
            <button className="w-full bg-emerald-500 py-2 hover:bg-emerald-300 rounded-md text-white group-hover:bottom-2 duration-500" onClick={()=>addToCart(product?.id)} >{loadingProduct===product?.id?<><i className='fa fa-spinner fa-spin text-sm'></i><span className="text-lg ml-1">Loading...</span></>:"Add to Cart"}</button>
            </div>
        </div>

        <div className="my-3 p-5">
        <h1 className="text-emerald-500 text-2xl font-semibold pb-5 px-5">More Related Products</h1>

            <Slider {...settings2}>
             {recommend?.map((product,index)=>(
            <div className="mb-5 md:mb-1 w-full sm:w-1/3 md:w-1/6 border-2 border-emerald-300 p-4 pb-16 relative hover:shadow-emerald-500 hover:shadow-lg duration-500 cursor-pointer overflow-hidden group " key={index}>

                <Link to={`/productDetails/${product.id}/${product.category.name}`}>
             <img src={product.imageCover} alt="" className="w-full mb-2" />
             <h4 className="text-emerald-400">{product.category.name}</h4>
             <h3 className="font-semibold text-black">{product.title.split(' ').slice(0,2).join(' ')}</h3>
             <div className="flex justify-between items-center">
                <h3>{product.price} EGP</h3>
                <h3><i className="fa-solid fa-star text-yellow-400"></i> <span>{product.ratingsAverage}</span></h3>
             </div>
             </Link>
             <button className="absolute -translate-x-1/2 left-1/2 -bottom-14 bg-emerald-500 hover:bg-emerald-300 py-2 w-3/4 rounded-md text-white group-hover:bottom-2 duration-500" onClick={()=>addToCart(product.id)} >{loadingProduct===product?.id?<><i className='fa fa-spinner fa-spin text-sm'></i><span className="text-lg ml-1">Loading...</span></>:"Add to Cart"}</button>

             </div> 
           ))}
           </Slider>
        </div>
        </>
    );
}

export default ProductDetails;



