import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const role = localStorage.getItem("role");

  const menu =
    role === "admin"
      ? [
          { name: "Dashboard", path: "/admin", icon: "📊" },
          { name: "Applications", path: "/admin", icon: "📄" },
        ]
      : [
          { name: "Dashboard", path: "/student", icon: "📊" },
          { name: "Apply NOC", path: "/apply", icon: "📝" },
          { name: "Tracking", path: "/tracking", icon: "📈" },
        ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-slate-900 text-white shadow-xl">

      {/* LOGO */}
      <div className="p-6 text-2xl font-bold text-indigo-300">
        NOC Portal
      </div>

      {/* MENU */}
      <div className="px-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-indigo-600"
                : "hover:bg-indigo-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;