import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="py-24 min-h-screen">
          <Outlet />
      </div>
        
      <Footer />
    </>
  );
}

export default Layout;
