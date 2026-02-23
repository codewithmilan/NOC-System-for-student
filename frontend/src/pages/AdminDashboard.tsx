import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const AdminDashboard = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [previewFile, setPreviewFile] = useState<string | null>(null);

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

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status: "Approved" } : app,
      ),
    );
  };

  // ================= REJECT =================
  const reject = async (id: string) => {
    await API.put(`/admin/reject/${id}`);

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status: "Rejected" } : app,
      ),
    );
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
      {/* HEADER */}
      <h1 className="text-xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-[64px] bg-gray-100 py-3 z-10 mb-4">
        <div className="flex gap-3 overflow-x-auto">
          {["All", "Approved", "Pending", "Rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm transition ${
                filter === item
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white border hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ================= APPLICATION LIST ================= */}
      <div className="space-y-4">
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            {/* INFO */}
            <div>
              <h2 className="text-lg font-semibold">{app.companyName}</h2>

              <p className="text-gray-600 text-sm">{app.role}</p>

              <span
                className={`text-xs font-semibold ${
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

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-4">
              <button
                onClick={() => approve(app._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition w-full sm:w-auto"
              >
                 Approve
              </button>

              <button
                onClick={() => reject(app._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition w-full sm:w-auto"
              >
                Reject
              </button>

              {/* PREVIEW BUTTONS */}
              <button
                onClick={() =>
                  setPreviewFile(
                    `http://localhost:5000/uploads/${app.offerLetter}`,
                  )
                }
                className="text-blue-600 text-sm underline"
              >
                Offer Letter
              </button>

              <button
                onClick={() =>
                  setPreviewFile(
                    `http://localhost:5000/uploads/${app.feeReceipt}`,
                  )
                }
                className="text-purple-600 text-sm underline"
              >
                Fee Receipt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FILE PREVIEW MODAL ================= */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white w-[95%] md:w-[80%] h-[85%] rounded-xl overflow-hidden relative">
            {/* CLOSE */}
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-3 right-4 text-xl font-bold z-10"
            >
              ✕
            </button>

            {/* PREVIEW */}
            <iframe
              src={previewFile}
              title="Document Preview"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;

// ================= STAT CARD =================
const StatCard = ({ title, value, color }: any) => (
  <div
    className={`bg-gradient-to-r ${color}
    text-white p-4 rounded-xl shadow-md`}
  >
    <p className="text-xs opacity-80">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
