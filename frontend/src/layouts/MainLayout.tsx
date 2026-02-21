import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex-1">
        {children}
      </div>

      <Footer />

    </div>
  );
};

export default MainLayout;
