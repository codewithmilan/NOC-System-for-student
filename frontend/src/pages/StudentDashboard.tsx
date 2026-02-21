import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
const name = localStorage.getItem("userName");
const StudentDashboard = () => {
  const navigate = useNavigate();

  // Logged in user email
  const email = localStorage.getItem("userEmail") || "User";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-10">
        {/* <h1 className="text-3xl font-bold text-gray-800">Dash</h1> */}

        <h1 className="text-3xl font-bold mb-10">Welcome, {name}</h1>
      </div>

      {/* CARDS GRID */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {/* APPLY NOC */}
        <div
          onClick={() => navigate("/apply")}
          className="
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white p-8 rounded-2xl shadow-lg
            cursor-pointer transform hover:scale-105
            transition duration-300
          "
        >
          <h2 className="text-2xl font-semibold"> Apply NOC</h2>

          <p className="mt-3 opacity-90">Submit internship or job request</p>
        </div>

        {/* TRACK STATUS */}
        <div
          onClick={() => navigate("/tracking")}
          className="
            bg-gradient-to-r from-green-500 to-emerald-600
            text-white p-8 rounded-2xl shadow-lg
            cursor-pointer transform hover:scale-105
            transition duration-300
          "
        >
          <h2 className="text-2xl font-semibold"> Track Status</h2>

          <p className="mt-3 opacity-90">Check approval progress</p>
        </div>

        {/* DOWNLOAD NOC */}
        <div
          onClick={() => navigate("/tracking")}
          className="
            bg-gradient-to-r from-purple-500 to-pink-600
            text-white p-8 rounded-2xl shadow-lg
            cursor-pointer transform hover:scale-105
            transition duration-300
          "
        >
          <h2 className="text-2xl font-semibold"> Download NOC</h2>

          <p className="mt-3 opacity-90">Available after approval</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
