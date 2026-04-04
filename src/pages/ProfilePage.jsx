import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [betOn, setBetOn] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="bg-[#e8e4e4] min-h-screen ">
      <div className="md:w-[80%] w-[95%] mx-auto text-xs font-semibold text-[#686565]">
        {/* RATE INFORMATION */}
        <div className="main-color text-white text-xs text-center py-2 font-semibold border-b border-black">
          RATE INFORMATION
        </div>

        {/* RATE ROW */}
        <div className="grid grid-cols-12 border border-[#b5b5b5]">
          <div className="bg-[#f1eeee] col-span-6 px-2 py-2 border-r border-[#b5b5b5]">
            Rate Difference :
          </div>

          <div className="bg-[#f1eeee] flex col-span-3 items-center justify-center border-r border-[#b5b5b5]">
            <select className="border border-[#999] px-1 py-1 text-[13px]">
              <option>0</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="bg-[#f1eeee] col-span-3 flex items-center justify-center">
            <button className="bg-[#008000] cursor-pointer text-white font-bold w-full py-1.5 m-1">
              UPDATE
            </button>
          </div>
        </div>

        {/* BET MODAL */}
        <div className="text-center flex items-center justify-around font-bold py-2">
          <div className="text-black text-[15px]">Bet Modal On/Off</div>

          <div
            onClick={() => setBetOn(!betOn)}
            className={`relative w-[55px] h-[22px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              betOn ? "bg-[#008000]" : "bg-red-500"
            }`}
          >
            {/* TEXT */}
            <span
              className={`absolute pb-0.5 top-1/2 -translate-y-1/2 text-white text-[11px] font-bold transition-all duration-300 ${
                betOn ? "left-1.5" : "right-1.5"
              }`}
            >
              {betOn ? "ON" : "OFF"}
            </span>

            {/* CIRCLE */}
            <div
              className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transform transition-all duration-300 ${
                betOn ? "translate-x-[32px]" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="main-color text-white text-center py-2 font-semibold text-xs border-b border-black">
          PERSONAL INFORMATION
        </div>

        <div className="border border-[#b5b5b5]">
          {[
            ["Client Code", "C2"],
            ["Client Name", "demo c2"],
            ["Chips", "709"],
            ["Contact No", "8888888888"],
            ["Date Of Joining", "2026-04-02 16:29:25"],
            ["Address", "India"],
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t border-[#c9c9c9]">
              <div className="bg-[#f1eeee] px-2 py-2 border-r border-[#c9c9c9]">
                {row[0]} :
              </div>

              <div className="bg-[#f1eeee] px-2 py-2 text-[#555]">{row[1]}</div>
            </div>
          ))}
        </div>

        {/* COMPANY INFO */}
        <div className="main-color text-white text-center py-2 font-semibold text-xs border-b border-black mt-1">
          COMPANY INFORMATION
        </div>

        <div className="grid grid-cols-2 border border-[#b5b5b5]">
          <div className="bg-[#f1eeee] px-[10px] py-[10px] border-r border-[#c9c9c9]">
            HELP LINE NO :
          </div>

          <div className="bg-[#f1eeee] px-[10px] py-[10px] text-[#555]">
            +91-1234567890
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-5">
          <button
            onClick={() => navigate("/client")}
            className="w-full cursor-pointer main-color text-white py-[8px] font-bold border border-black"
          >
            BACK TO MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
