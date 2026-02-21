import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  // ================= INPUT =================
  const handleChange = (e:any) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors:any = {};

    if (!form.name.trim()) newErrors.name = "Name required";

    if (!form.email.trim())
      newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.rollNo.trim())
      newErrors.rollNo = "Roll number required";

    if (!form.password)
      newErrors.password = "Password required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // ✅ FIXED API PATH
      await API.post("/student/register", form);

      alert("Account Created ✅");
      navigate("/");

    } catch (err:any) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a]">

      {/* BACKGROUND */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white"
      >

        <h2 className="text-4xl font-semibold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-white/70 mb-8">
          NOC Management System
        </p>

        <Input name="name" placeholder="Full Name" error={errors.name} onChange={handleChange}/>
        <Input name="email" placeholder="Email Address" error={errors.email} onChange={handleChange}/>
        <Input name="rollNo" placeholder="Roll Number" error={errors.rollNo} onChange={handleChange}/>
        <Input type="password" name="password" placeholder="Password" error={errors.password} onChange={handleChange}/>

        <button
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-indigo-500 to-purple-500
          hover:scale-105 transition-all duration-300
          shadow-lg disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-sm mt-6 text-white/70">
          Already registered?{" "}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-indigo-300 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;


// ================= INPUT =================

const Input = ({ name, placeholder, type="text", onChange, error }:any) => (
  <div className="mb-5">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full p-3 rounded-xl bg-white/20 border 
      ${error ? "border-red-400" : "border-white/20"}
      placeholder-white/60 text-white outline-none
      focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40`}
    />
    {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
  </div>
);