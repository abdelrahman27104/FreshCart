import Slider from "react-slick";
import useGategory from "../../Hooks/useGategory";
import Loading from "../Loading/Loading";



function CategoriesSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: false,
        autoplay:true,
        autoplaySpeed:3000,
        pauseOnHover: false,
        responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
           }
        ]
      };

      const {data,isLoading,error}=useGategory();

     


     if(isLoading)return <Loading />
     if(error)console.log("error fetch gategorire",error);
     


    return (
            <div className="full py-10">
            <h1 className="text-emerald-500 text-2xl font-semibold pb-5 px-5">Shop Popular Categories</h1>
            <Slider {...settings}>
                {data.map((category)=>
                <div key={category._id} className="text-center">
                    <div className="bg-emerald-300 rounded-full mx-2 px-5 flex justify-center items-center text-center">
                    <img src={category.image} alt="" className="h-[250px] w-full rounded-3xl"   />
                    </div>

                    <h3 className="text-emerald-800 font-bold ">{category.name}</h3>
                </div>
                
                )}
            </Slider>
            </div>
    )
    

}

export default CategoriesSlider
