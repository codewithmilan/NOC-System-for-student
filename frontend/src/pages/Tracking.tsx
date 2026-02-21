import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const Tracking = () => {
  const [applications, setApplications] = useState<any[]>([]);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/application/myApplications");
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const statusColor = (status: string) => {
    if (status === "Approved") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Application Tracking</h1>

      <div className="grid gap-6">
        {applications.map((app, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{app.companyName}</h2>

              <p className="text-gray-500">{app.role}</p>

              <p className="text-sm text-gray-400 mt-2">
                {app.startDate} → {app.endDate}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div
                className={`${statusColor(app.status)} text-white px-5 py-2 rounded-full`}
              >
                {app.status}
              </div>

              {app.status === "Approved" && (
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:5000/api/pdf/generate/${app._id}`,
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Download NOC
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Tracking;
