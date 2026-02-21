import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-[#0f172a] text-white">

      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[140px] opacity-30 top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px] opacity-30 bottom-[-150px] right-[-150px]" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 text-center px-6">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold shadow-xl">
            N
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          NOC Management System
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          A smart digital platform to apply Internship NOC online,
          upload documents securely, track approval status in real-time,
          and simplify college administration workflow.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-indigo-500 to-indigo-600
            hover:scale-105 transition shadow-lg"
          >
            🎓 Student Login
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-purple-500 to-purple-600
            hover:scale-105 transition shadow-lg"
          >
            🛠 Admin Login
          </button>

        </div>

        {/* ===== FEATURES SECTION ===== */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <Feature
            title="Easy Application"
            desc="Apply for NOC digitally with company details and internship duration."
          />

          <Feature
            title="Document Upload"
            desc="Upload offer letter and fee receipt securely in one place."
          />

          <Feature
            title="Real-Time Tracking"
            desc="Track approval status instantly — Pending, Approved or Rejected."
          />

        </div>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 text-white/50 text-sm">
        © 2026 NOC Management System • Built by Milan 🚀
      </p>
    </div>
  );
};

export default Landing;


// ===== FEATURE CARD =====
const Feature = ({ title, desc }: any) => (
  <div
    className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl
    border border-white/20 shadow-lg hover:scale-105 transition"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
  </div>
);