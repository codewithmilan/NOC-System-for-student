import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("student");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================= INPUT =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);

      // ✅ FIX 1 — role based endpoint
      const endpoint =
        type === "admin" ? "/admin/login" : "/student/login";

      const res = await API.post(endpoint, form);

      // ✅ FIX 2 — correct data storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userName", res.data.user.name);

      // ✅ FIX 3 — redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0f172a] overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600 blur-[120px] opacity-30 top-[-100px] left-[-100px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-[120px] opacity-30 bottom-[-100px] right-[-100px] rounded-full" />

      {/* CARD */}
      <div
        className="relative z-10 w-full max-w-md p-10 rounded-3xl
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white"
      >

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-500
            flex items-center justify-center text-2xl font-bold shadow-lg"
          >
            N
          </div>
        </div>

        <h2 className="text-4xl font-semibold text-center">
          Welcome Back
        </h2>

        <p className="text-center text-white/70 mb-8">
          Login to NOC Management System
        </p>

        {/* ROLE TOGGLE */}
        <div className="flex bg-white/10 rounded-xl p-1 mb-6">
          <button
            onClick={() => setType("student")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              type === "student"
                ? "bg-indigo-500 text-white shadow"
                : "text-white/70"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setType("admin")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              type === "admin"
                ? "bg-indigo-500 text-white shadow"
                : "text-white/70"
            }`}
          >
            Admin
          </button>
        </div>

        {/* EMAIL */}
        <Input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full mt-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-indigo-500 to-purple-500
          hover:scale-105 transition-all duration-300
          shadow-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : `Login as ${type}`}
        </button>

        {/* REGISTER */}
        <p className="text-center mt-6 text-white/70">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-300 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;


// ===== INPUT COMPONENT =====
const Input = ({ name, placeholder, type="text", onChange }: any) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/20
    placeholder-white/60 text-white outline-none
    focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40
    transition"
  />
);