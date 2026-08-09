import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-16 pb-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;