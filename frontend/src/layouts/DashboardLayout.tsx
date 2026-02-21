import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: any) => {

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 ml-64 flex flex-col">

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-10">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;