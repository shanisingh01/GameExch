import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../main";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const user = useSelector((state) => state.user.user);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { oldPassword, newPassword, confirmPassword } = form;

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    // if (newPassword !== confirmPassword) {
    //   return setError("Passwords do not match");
    // }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api-v1/Client/change_password`,
        {
          client_id: user.client_id,
          auth_key: user.auth_key,
          oldpassword: oldPassword,
          newpassword: newPassword,
          conpassword: confirmPassword,
        },
      );
      console.log(res.data.status === false);

      if (res.data.status === false) {
        setLoading(false);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      navigate("/");
      setLoading(false);
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex pt-6 justify-center bg-[#eeecec]">
      <div className="w-[95%] md:w-72  h-71 rounded-md overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="main-color text-white text-center py-4.5 text-[18px] font-medium rounded-t-sm">
          Change Password
        </div>

        {/* Body */}
        <div className="bg-[#7d4196] p-5 flex flex-col items-center">
          {/* Input */}
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Enter Old Password"
            className="w-full p-2 rounded-sm mb-2 bg-[#eeecec] font-semibold text-[#111111] text-[13px] outline-none border border-transparent"
          />

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter New Password"
            className="w-full p-2 rounded-sm mb-2 bg-[#eeecec] font-semibold text-[#111111] text-[13px] outline-none border border-transparent"
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter Confirm Password"
            className="w-full p-2 rounded-sm mb-2 bg-[#eeecec] font-semibold text-[#111111] text-[13px] outline-none border border-transparent"
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="mt-3 h-9 pb-0.5 px-4 cursor-pointer  text-white text-[14px] rounded-full main-color shadow-md active:scale-95 transition"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
