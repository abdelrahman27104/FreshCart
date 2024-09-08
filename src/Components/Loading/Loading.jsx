import logo from "../../assets/freshcart-logo.svg"

function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 bg-emerald-500">
             <img src={logo} alt="fresh" className="w-64 animate-pulse" />
       </div>
    )
}

export default Loading
