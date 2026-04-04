import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlay,
  FaGamepad,
  FaTrophy,
  FaWallet,
  FaBars,
  FaBook,
  FaChartBar,
  FaUser,
  FaInfoCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaArrowRight, FaRightFromBracket } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    { name: "HOME", icon: <FaHome />, path: "/client" },
    { name: "INPLAY", icon: <FaPlay />, path: "/client/inplay" },
    { name: "CASINO", icon: <FaGamepad />, path: "/" },
    { name: "FREE GAMES", icon: <FaTrophy />, path: "/" },
    { name: "LEDGER", icon: <FaWallet />, path: "/client/ledger" },
    { name: "ACCOUNT STATEMENT", icon: <FaBook />, path: "/client/statement_details" },
    { name: "EXPOSURE", icon: <FaChartBar />, path: "/client/exposure" },
    { name: "PROFILE", icon: <FaUser />, path: "/client/profile" },
    { name: "RULES", icon: <FaInfoCircle />, path: "/client/rules" },
    { name: "PASSWORD", icon: <FaKey />, path: "/client/change_password" },
    { name: "LOGOUT", icon: <FaSignOutAlt />, path: "/" },
  ];

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="w-full z-50 sticky top-0 font-sans">
      {/* ================= TOP HEADER ================= */}
      <div className="h-[53px] flex items-center justify-between px-4 md:px-5 main-color text-white border-b border-gray-400">
        {/* LOGO */}
        <Link to="/client">
          <img src={logo} alt="logo" className="h-[34px] md:h-[39px]" />
        </Link>

        {/* CENTER TEXT */}
        <div
          onClick={() => navigate("/client/profile")}
          className="text-[14px] cursor-pointer font-medium tracking-wide"
        >
          demo c2
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-[16px] font-bold">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/client"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-7 h-[53px] text-black flex items-center gap-1 ${
                  isActive ? "bg-[#ffffff] flex" : "hidden"
                }`
              }
            >
              <div className="flex font-bold items-center gap-1">
                {/* INPLAY CUSTOM TEXT */}
                {item.name === "INPLAY" && (
                  <span className="text-[16px] flex items-center gap-1">
                    MATCHES
                  </span>
                )}

                {/* HOME CUSTOM TEXT */}
                {item.name === "HOME" ? (
                  <span className="text-[16px] flex items-center gap-1">
                    MENU
                  </span>
                ) : (
                  item.name !== "INPLAY" && (
                    <div className="flex items-center gap-1">
                      <span className="text-[18px]">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  )
                )}
              </div>
            </NavLink>
          ))}

          {location.pathname.includes("game") && (
            <NavLink
              to="/client"
              end // ✅ IMPORTANT FIX
              className={({ isActive }) =>
                `px-7 h-[53px] bg-white text-black flex items-center gap-1 `
              }
            >
              MATCHES
            </NavLink>
          )}
          {/* HOME */}

          <NavLink
            to="/client"
            end //  IMPORTANT FIX
            className={({ isActive }) =>
              `px-7 h-[53px] flex items-center gap-1  ${
                isActive ? "" : "text-white"
              }`
            }
          >
            <FaHome className="text-[20px]" />
            HOME
          </NavLink>

          {/* LOGOUT */}
          <div className="flex items-center gap-1 px-4 cursor-pointer hover:text-red-400">
            <FaSignOutAlt className="text-[20px]" />
            LOGOUT
          </div>
        </div>

        {/* MOBILE MENU ICON */}
        <div
          className="md:hidden text-xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed md:hidden  inset-0 bg-black/60 z-40 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed md:hidden top-0 right-0 h-full w-full bg-black text-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* CLOSE */}
        <div className="flex justify-end px-4 py-4 border-b border-gray-400">
          <FaRightFromBracket
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* MENU LIST */}
        <div className="text-[14px] font-semibold">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-6 py-[10px] border-b border-gray-400 ${
                  isActive ? "bg-[#1e3a5f]" : ""
                }`}
              >
                <div className="flex font-bold items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>

                <FaArrowRight className="text-[18px]" />
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* ================= BLACK STRIP ================= */}
      <div className="h-[28px] bg-black text-white text-[13px]  flex items-center">
        <marquee behavior="scroll" direction="left">
          WELCOME TO GAMEEXCH.IN
        </marquee>
      </div>

      {/* ================= YELLOW STRIP ================= */}
      <div className="h-[30px] bg-[#ffcc00] flex items-center justify-center text-[13px] md:text-[14px] font-semibold">
        <span>Chips: 709</span>
        <span className="ml-3 text-blue-700">
          Expo : <span className="text-red-600">0</span>
        </span>
      </div>
    </div>
  );
}

export default Header;
