import { useState } from "react";
import { Menu } from "lucide-react";

const Navbar = ({ setMenuOpen }: any) => {

  // ✅ get data from localStorage
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("userName");

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 md:px-8 py-4 shadow">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">

        {/* ✅ MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={26} />
        </button>

        {/* TITLE */}
        <h1 className="text-lg font-semibold text-gray-700">
          {role === "admin" ? "Admin Panel" : "Dashboard"}
        </h1>

      </div>

      {/* RIGHT PROFILE */}
      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer"
        >
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-2">{name}</p>

            <button
              onClick={logout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;