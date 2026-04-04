import React from "react";
import { FaTv } from "react-icons/fa";
import bat from "../assets/bat.png";
import { useNavigate } from "react-router-dom";

const matches = [
  {
    id: 1,
    title: "Lucknow Super Giants v Delhi Capitals",
    time: "01/04/2026 06:30:00 PM",
    isLive: true,
  },
  {
    id: 2,
    title: "Multan Sultans v Hyderabad Kingsmen",
    time: "01/04/2026 07:30:00 PM",
    isLive: false,
  },
];

const Inplay = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#cfcfcf] flex justify-center md:px-2 sm:px-4">
      {/* MAIN CONTAINER */}
      <div className="w-full md:max-w-[70%] max-w-[100%]">
        {/* HEADER */}
        <div className="bg-[#1367bc] text-white border-b border-gray-100 flex items-center px-3 sm:px-4 h-[45px] ">
          <img src={bat} alt="cricket" className="w-[30px] sm:w-[32px] mr-2" />

          <span className="text-[15px] mt-1 sm:text-[17px] font-bold tracking-wide">
            CRICKET
          </span>
        </div>

        {/* MATCH CARDS */}
        {matches.map((item, index) => (
          <div
            onClick={() => navigate(`/client/game/${item.id}`)}
            key={index}
            className="cursor-pointer bg-white rounded-b-[8px] mb-2.5 overflow-hidden"
          >
            <div className="main-color px-3 sm:px-5 pt-3 sm:pt-4 pb-3 text-white">
              {/* TITLE */}
              <h2 className="text-[15px] sm:text-[18px] font-bold leading-tight">
                {item.title}
              </h2>

              {/* SERIES */}
              <p className="text-[12px] sm:text-[15px] font-semibold mt-1 text-gray-200">
                Series
              </p>

              {/* BOTTOM */}
              <div className="flex items-center justify-between mt-1">
                {/* DATE */}
                <span className="text-[12px] sm:text-[12px] font-semibold">
                  {item.time}
                </span>

                {/* RIGHT SIDE */}
                <div className="flex w-[50%] items-center justify-around gap-4 sm:gap-6">
                  {/* TV ICON */}
                  <div className="flex items-center gap-2">
                    <FaTv className="text-[#1ec3ff] mr-2 text-[16px] sm:text-[18px]" />

                    {item.isLive && (
                      <div className="flex  items-center gap-1">
                        {/*  Blinking Dot */}
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping relative">
                          <span className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"></span>
                        </span>

                        {/* LIVE Text */}
                        <span className="text-green-400 text-[14px] font-semibold">
                          LIVE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* B F */}
                  <div className="flex gap-2 sm:gap-4 text-[13px] sm:text-[15px] font-bold text-[#ffcc00]">
                    <span>B</span>
                    <span>F</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inplay;
