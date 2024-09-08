import visa from "../../assets/visa.png"
import american from "../../assets/american-express.png"
import card from "../../assets/card.png"
import paypal from "../../assets/paypal.png"
import store1 from "../../assets/app-store-logo.png"
import store2 from "../../assets/google-play-icon.png"


function Footer() {
    return (
        <footer className="bg-[#e5e7eb] px-5 py-8">
            <h2 className="text-2xl text-gray-800 mb-2">Get the FreshCart app</h2>
            <p className="text-gray-500">We will send you a link, open it on your phone to download the app.</p>
            <div className="flex items-center my-6 space-x-5">
                <input type="text" placeholder="Email..." className="p-1 w-3/4 rounded-md" />
                <button className="w-1/5 bg-emerald-500 rounded-md p-1 text-white capitalize hover:bg-emerald-400 focus:ring-4 ring-emerald-300 focus:outline-none">share link</button>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-col md:flex-row items-center justify-between py-3">
                <div className="flex items-center space-x-1">
                    <h2 className="text-lg text-gray-600">payment partners</h2>
                    <img src={visa} alt="visa" className="w-8" />
                    <img src={american} alt="express" className="w-8"/>
                    <img src={card} alt="card" className="w-8" />
                    <img src={paypal} alt="paypal" className="w-8" />
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center space-x-1">
                    <h3 className="text-lg text-gray-600">Get deliveries with FreshCart</h3>
                    <div className="flex items-center space-x-2">
                    <img src={store1} alt="app-store" className="w-24" />
                    <img src={store2} alt="google-store" className="w-24"  />
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />





        </footer>
    )
}


export default Footer
