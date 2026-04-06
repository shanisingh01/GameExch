import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserInfo } from "../redux/userSlice";
import useFetchUserInfo from "../costumHooks/useFetchUserInfo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/client/rules", { replace: true });
  //   }
  // }, [user]);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1. Login API
      const res = await axios.post(`${BASE_URL}/Login/client_login`, {
        username: form.username,
        password: form.password,
      });

      const loginData = res?.data?.data;

      if (!loginData) {
        toast.error("Login failed");
        return;
      }

      // ✅ store login data
      dispatch(setUser(loginData));

      // 🔥 store in localStorage (important)
      localStorage.setItem("user", JSON.stringify(loginData));

      // ✅ 2. Fetch Profile API
      const profileRes = await axios.post(
        `${BASE_URL}/api-v1/Client/client_profile`,
        {
          client_id: loginData.client_id,
          auth_key: loginData.auth_key,
        },
      );

      const profileData = profileRes?.data?.data;

      if (profileData) {
        dispatch(setUserInfo(profileData)); // ✅ correct state
      }

      toast.success("Login successful");

      // ✅ redirect AFTER profile loaded
      navigate("/client/rules", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center main-color px-4">
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
            className="w-full h-[33px] mb-4 px-3 bg-[#e5e5e5] text-[14px] text-gray-700 rounded-xs focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            className="w-full h-[33px] mb-5 px-3 bg-[#e5e5e5] text-[14px] text-gray-700 rounded-xs focus:outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[36px] cursor-pointer bg-[#2d79c7] hover:bg-[#256bb3] text-white font-semibold rounded-xs transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
