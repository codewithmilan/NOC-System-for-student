import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: any) => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">

          {/* overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* drawer */}
          <div className="w-64 h-full">
            <Sidebar />
          </div>

        </div>
      )}

      {/* CONTENT AREA */}
      <div className="flex-1 md:ml-64 flex flex-col">

        <Navbar setMenuOpen={setMenuOpen} />

        <main className="p-6 md:p-10">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;