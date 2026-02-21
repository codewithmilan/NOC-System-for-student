import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const AdminDashboard = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  // ================= FETCH =================
  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ================= APPROVE =================
  const approve = async (id: string) => {
    await API.put(`/admin/approve/${id}`);
    fetchApplications();
  };

  // ================= REJECT =================
  const reject = async (id: string) => {
    await API.put(`/admin/reject/${id}`);
    fetchApplications();
  };

  // ================= FILTER =================
  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  // ================= STATS =================
  const total = applications.length;
  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total"
          value={total}
          color="from-indigo-500 to-blue-600"
        />
        <StatCard
          title="Approved"
          value={approved}
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Pending"
          value={pending}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          color="from-red-500 to-pink-600"
        />
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex gap-3 mb-6">
        {["All", "Approved", "Pending", "Rejected"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-full transition ${
              filter === item
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ================= APPLICATION LIST ================= */}
      <div className="grid gap-6">
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{app.companyName}</h2>

              <p className="text-gray-600">{app.role}</p>

              <span
                className={`text-sm font-semibold ${
                  app.status === "Approved"
                    ? "text-green-600"
                    : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {app.status}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => approve(app._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:scale-105"
              >
                Approve
              </button>

              <button
                onClick={() => reject(app._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:scale-105"
              >
                Reject
              </button>
              <a
                href={`http://localhost:5000/uploads/${app.offerLetter}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Offer Letter
              </a>

              <a
                href={`http://localhost:5000/uploads/${app.feeReceipt}`}
                target="_blank"
                className="text-purple-600 underline ml-4"
              >
                View Fee Receipt
              </a>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

// ================= STAT CARD COMPONENT =================
const StatCard = ({ title, value, color }: any) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg`}
  >
    <h3 className="text-lg opacity-80">{title}</h3>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);
