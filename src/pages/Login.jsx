import React, { useState } from "react";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //  State
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.username || !form.password) {
    toast.error("Please fill all fields");
    return; // ✅ stop execution
  }

  try {
    setLoading(true);

    console.log("Login Data:", form);

    // fake delay (API simulation)
    await new Promise((res) => setTimeout(res, 1000));

    toast.success("Login successful");

    // ✅ small delay so toast is visible
    setTimeout(() => {
      navigate("/client/rules");
    }, 500);

  } catch (err) {
    toast.error("Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center main-color px-4">
      {/* Card */}
      <div className="w-full max-w-[520px] rounded-xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="main-color p-5 text-center">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img
              src={logo}
              alt="logo"
              className="w-[180px] drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="USERNAME"
            className="w-full h-[33px] mb-4 px-3 bg-[#e5e5e5] text-[14px] text-gray-700 placeholder-gray-400 rounded-sm focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            className="w-full h-[33px] mb-5 px-3 bg-[#e5e5e5] text-[14px] text-gray-700 placeholder-gray-400 rounded-sm focus:outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[36px] cursor-pointer bg-[#2d79c7] hover:bg-[#256bb3] text-white font-semibold rounded-md transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
