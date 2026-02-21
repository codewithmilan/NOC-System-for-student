import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const ApplyNOC = () => {

  // ================= STATES =================
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
  });

  const [offerLetter, setOfferLetter] = useState<File | null>(null);
  const [feeReceipt, setFeeReceipt] = useState<File | null>(null);

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors: any = {};

    if (!form.companyName.trim())
      newErrors.companyName = "Company name required";

    if (!form.role.trim())
      newErrors.role = "Role required";

    if (!form.startDate)
      newErrors.startDate = "Start date required";

    if (!form.endDate)
      newErrors.endDate = "End date required";

    if (!offerLetter)
      newErrors.offerLetter = "Offer letter required";

    if (!feeReceipt)
      newErrors.feeReceipt = "Fee receipt required";

    if (form.startDate && form.endDate) {
      if (form.endDate < form.startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const data = new FormData();

      data.append("companyName", form.companyName);
      data.append("role", form.role);
      data.append("startDate", form.startDate);
      data.append("endDate", form.endDate);
      data.append("offerLetter", offerLetter!);
      data.append("feeReceipt", feeReceipt!);

      await API.post("/application/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✅ NOC Applied Successfully!");

      setForm({
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
      });

      setOfferLetter(null);
      setFeeReceipt(null);

    } catch (err) {
      alert("Application failed");
    }

    setLoading(false);
  };

  // ================= UI =================
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Apply For NOC
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Company */}
            <div>
              <label className="font-medium">Company Name</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mt-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Google / Microsoft"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="font-medium">Role / Position</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mt-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Software Intern"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-medium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg mt-2"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg mt-2"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">{errors.endDate}</p>
                )}
              </div>

            </div>

            {/* OFFER LETTER */}
            <div>
              <label className="font-medium">
                Upload Offer Letter
              </label>
              <input
                type="file"
                accept=".pdf,image/*"
                className="w-full border p-3 rounded-lg mt-2"
                onChange={(e) =>
                  setOfferLetter(e.target.files?.[0] || null)
                }
              />
              {errors.offerLetter && (
                <p className="text-red-500 text-sm">{errors.offerLetter}</p>
              )}
            </div>

            {/* FEE RECEIPT */}
            <div>
              <label className="font-medium">
                Upload Fee Receipt
              </label>
              <input
                type="file"
                accept=".pdf,image/*"
                className="w-full border p-3 rounded-lg mt-2"
                onChange={(e) =>
                  setFeeReceipt(e.target.files?.[0] || null)
                }
              />
              {errors.feeReceipt && (
                <p className="text-red-500 text-sm">{errors.feeReceipt}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              {loading ? "Submitting..." : "Apply NOC"}
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyNOC;